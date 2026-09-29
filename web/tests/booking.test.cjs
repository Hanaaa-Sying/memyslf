const fs = require('node:fs');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const path = require('node:path');
const html = fs.readFileSync(path.join(__dirname, '../../index.html'), 'utf8');
const scripts = [...html.matchAll(/<script\b[^>]*>([\s\S]*?)<\/script>/gi)].map(m => m[1]);
scripts.forEach(s => new vm.Script(s));
const nodes = new Map();
const el = id => {
  if (!nodes.has(id)) nodes.set(id, {value:'', disabled:false, style:{}, validity:{valid:true}, textContent:''});
  return nodes.get(id);
};
let requests=0, sends=0, failCalendar=false, busy=[], failEmail=false, payload;
const ctx = vm.createContext({ console, Intl, Date, AbortController, setTimeout, clearTimeout,
  document: {addEventListener(){}, getElementById:el, querySelectorAll:()=>[el('b-submit'), el('b-email')]},
  fetch: async()=> { requests++; if(failCalendar) throw Error('offline'); return {ok:true,json:async()=>({calendars:{[vm.runInContext('GOOGLE_CALENDAR_ID',ctx)]:{busy}}})}; },
  emailjs:{send:async(a,b,p)=>{sends++;payload=p;if(failEmail)throw Error('send failed');}}
});
vm.runInContext(scripts[0],ctx);
const run = code => vm.runInContext(code,ctx);
const submit=()=>run('onBookingSubmit({preventDefault(){}})');
function select() {
  run('_selectedDate = addDaysToStr(hanaToday(), 2); _selectedTime = localToUtcMs(_selectedDate, 10, 0, getHanaTz(_selectedDate)); _selectedDuration = 60;');
  el('b-email').value='hello@example.com';el('b-name').value='Test';el('b-topic').value='Test topic';
  el('b-email').validity.valid=true;
}
(async()=>{
  assert.equal(run('dateInZone(Date.parse("2026-09-30T00:30:00Z"), "America/Los_Angeles")'),'2026-09-29');
  select();
  assert.equal(run('validBookingSlot(_selectedDate, _selectedTime, 0, [])'),false);
  assert.equal(run('validBookingSlot(_selectedDate, _selectedTime, 1.5, [])'),false);
  assert.equal(run('validBookingSlot(_selectedDate, Date.now(), 60, [])'),false);
  run('BLOCKED_DAYS[_selectedDate] = {zh:"test"}');
  assert.equal(run('validBookingSlot(_selectedDate, _selectedTime, 60, [])'),false);
  run('delete BLOCKED_DAYS[_selectedDate]');
  assert.equal(run('getMaxDurationForDay(_selectedDate, [{start:new Date(_selectedTime-86400000).toISOString(),end:new Date(_selectedTime+86400000).toISOString()}])'),0);
  el('b-email').validity.valid=false;await submit();assert.equal(sends,0);assert.equal(requests,0);
  select();failCalendar=true;await submit();assert.equal(sends,0);assert.equal(el('b-submit').disabled,false);
  failCalendar=false;busy=run('[{start:new Date(_selectedTime).toISOString(),end:new Date(_selectedTime+3600000).toISOString()}]');
  await submit();assert.equal(sends,0);assert.equal(el('err-submit').textContent,run('COPY.zh.bookingSlotExpired'));
  busy=[];failEmail=true;await submit();assert.equal(sends,1);assert.equal(el('b-submit').disabled,false);
  failEmail=false;run('_visitorTz="America/Los_Angeles"');
  await Promise.all([submit(),submit()]);assert.equal(sends,2);assert.equal(el('b-submit').disabled,false);
  assert.equal(payload.booking_date,run('dateInZone(_selectedTime, _visitorTz)'));
  assert.match(payload.booking_time,/America\/Los_Angeles/);assert.match(payload.booking_time,/Asia\/Shanghai/);
  run('resetBookingFeedback()');assert.equal(el('booking-success').style.display,'none');
  select();await submit();assert.equal(sends,3);
  const before=requests;await run('fetchBusyForWeek([_selectedDate])');assert.equal(requests,before);
  run('Object.keys(_busyCacheTimes).forEach(k=>_busyCacheTimes[k]=0)');
  await run('fetchBusyForWeek([_selectedDate])');assert.equal(requests,before+1);
  for(const key of ['bookingCalendarError','bookingRetry','bookingEmailMe','bookingValidationEmail','bookingSlotExpired']) {
    assert.equal(run(`typeof COPY.zh.${key}`),'string');assert.equal(run(`typeof COPY.en.${key}`),'string');
  }
  console.log('PASS: syntax, timezone dates, blocked days, duration, lead time, email validation, fresh availability, failed requests, send retry, duplicate submit, repeat booking, cache expiry, bilingual errors. No real requests or emails sent.');
})().catch(e=>{console.error(e);process.exitCode=1;});
