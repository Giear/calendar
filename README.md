# calendar
# author : MinChi Gu
#820002446@qq.com
MyCalendarForHotel
************************************
var calendar = new CalendarDate(closeFn);

closeFn
#you callback after close

calendar.closeCalendar()
#close calendar

calendar.setDisableDays() 
#this is disable day separately
#params : ['2020-10-1','2020-10-8','2020-10-10']
#or 
#this is disable area
#params : { startDay: '2020-11-3', endDay: '2020-11-8' }

calendar.getStatus()
#you can judge calendar status

calendar.getDurationDay()
#you can get you select days' area
