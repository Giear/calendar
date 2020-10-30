(function() {
  function CalendarDate(closeFn) {
    var vm = this;
    var today = new Date();
    var currentDate = {
      year: today.getFullYear(),
      month: today.getMonth()
    };
    var myScreen;
    var myCalendar;
    var calendarBox;
    var calendarTitle;
    var calendarWeek;
    var calendarWeekExist;
    var calendarContent;
    var calendar;
    var calendarP;
    var calendarUl;
    var durationDay = {
      startDay: '',
      endDay: '',
      diffDay: ''
    };
    var rightDurationDay = {
      startDay: '',
      endDay: '',
      diffDay: ''
    };
    var status = {
      isClose: true
    };
    vm.durationDay = durationDay;

    var noteStar = $('<p class="note">');
    noteStar.text('入住');
    var noteEnd = $('<p class="note">');
    noteEnd.text('离店');

    function userWantToClose() {
      closeCalendar();
      !durationDay.endDay && handleSelectedRange('closeFirstDeal');
      exportDurationDay() && handleSelectedRange('closeLastDeal');
      initNote();
      if (rightDurationDay.startDay && rightDurationDay.endDay) {
        setNote();
      } else {
        durationDay.startDay = '';
        durationDay.endDay = '';
      }
      setRangeBackground('#ebf4fa');
      closeFn();
    }

    function closeCalendar() {
      myCalendar.css({ 'animation-name': 'closeCalendar' });
      myScreen.css('display', 'none');
      status.isClose = true;

      typeof closeFn === 'function' && closeFn();
    }
    function openCalendar() {
      myCalendar.css({ 'animation-name': 'openCalendar' });
      myScreen.css('display', 'block');
      status.isClose = false;
    }

    function getDuration(d) {
      var dt = new Date(d);
      dt.setMonth(dt.getMonth() + 1);
      dt.setDate(0);
      return dt.getDate();
    }
    function getMonthFirstWeekDay(d) {
      var weekday;
      var dt = new Date(d);
      dt.setDate(1);
      weekday = dt.getDay();
      weekday = weekday === 0 ? 7 : weekday;
      return weekday;
    }

    function setYearMonth(currentDate) {
      if (currentDate.month > 12) {
        currentDate.year = currentDate.year + 1;
        currentDate.month = 1;
      }
    }

    function setElements(currentDate) {
      if (!calendarWeekExist) {
        myScreen = $('<div id="screen"></div>');

        myCalendar = $('#calendar');
        calendarBox = $('<div class="my_calendar">');

        calendarTitle = $(
          '<div class="title"><span class="title_fist_span">取消</span>选择日期<span class="title_last_span">确定</span></div>'
        );

        calendarWeek = $(
          '<ul class="week">' +
            '<li>一</li>' +
            '<li>二</li>' +
            '<li>三</li>' +
            '<li>四</li>' +
            '<li>五</li>' +
            '<li>六</li>' +
            '<li>日</li>' +
            '</ul>'
        );
        calendarContent = $('<div class="content">');
        myCalendar.before(myScreen);
        myCalendar.append(calendarBox);
        calendarBox.append(calendarTitle);
        calendarBox.append(calendarWeek);
        calendarBox.append(calendarContent);

        $('.title_fist_span').on('click', function() {
          userWantToClose();
        });
        $('.title_last_span').on('click', function() {
          closeCalendar();
        });
        myScreen.on('click', function() {
          userWantToClose();
        });
        calendarWeekExist = true;
      }

      calendar = $(
        '<div class="content_' +
          currentDate.year +
          '_' +
          currentDate.month +
          '">'
      );
      calendar.css({
        float: 'left',
        width: '100%'
      });
      calendarP = $('<p class="ymp">');
      calendarP.text(currentDate.year + '年' + currentDate.month + '月');

      calendarUl = $(
        '<ul date="' + currentDate.year + '-' + currentDate.month + '">'
      );

      calendarContent.append(calendar);
      calendar.append(calendarP);
      calendar.append(calendarUl);
    }

    function initNote() {
      durationDay.startDay &&
        $('li[date="' + durationDay.startDay + '"]')
          .find('p')
          .remove();
      durationDay.endDay &&
        $('li[date="' + durationDay.endDay + '"]')
          .find('p')
          .remove();
    }

    function setNote() {
      durationDay.startDay &&
        $('li[date="' + durationDay.startDay + '"]').append(noteStar);
      durationDay.endDay &&
        $('li[date="' + durationDay.endDay + '"]').append(noteEnd);
    }

    function checkSelectedRange(that) {
      var startDay = new Date(durationDay.startDay).getTime();
      var endDay = new Date(durationDay.endDay).getTime();
      if (startDay && endDay && startDay >= endDay) {
        $('li[date="' + durationDay.startDay + '"]').css({
          background: '#fff',
          color: '#000'
        });
        $('li[date="' + durationDay.endDay + '"]').css({
          background: '#4289ff',
          color: '#fff'
        });
        durationDay.startDay = $(that).attr('date');
        durationDay.endDay = '';
      }
    }

    function handleSelectedRange(that) {
      if (that === 'closeFirstDeal') {
        $('li[date="' + durationDay.startDay + '"]').css({
          background: '#fff',
          color: '#000'
        });
        return;
      }

      if (that === 'closeLastDeal') {
        $('li[date="' + durationDay.startDay + '"]').css({
          background: '#4289ff',
          color: '#fff'
        });
        $('li[date="' + durationDay.endDay + '"]').css({
          background: '#4289ff',
          color: '#fff'
        });
        return;
      }

      if (durationDay.startDay && durationDay.endDay && !status.isClose) {
        $('li[date="' + durationDay.startDay + '"]').css({
          background: '#fff',
          color: '#000'
        });
        $('li[date="' + durationDay.endDay + '"]').css({
          background: '#fff',
          color: '#000'
        });

        durationDay.startDay = $(that).attr('date');
        durationDay.endDay = '';
        $('li[date="' + durationDay.startDay + '"]').css({
          background: '#4289ff',
          color: '#fff'
        });
        return;
      }

      if (durationDay.startDay && !durationDay.endDay) {
        durationDay.endDay = $(that).attr('date');
        $('li[date="' + durationDay.endDay + '"]').css({
          background: '#4289ff',
          color: '#fff'
        });
        checkSelectedRange(that);
        return;
      }

      if (!durationDay.startDay) {
        durationDay.startDay = $(that).attr('date');
        $('li[date="' + durationDay.startDay + '"]').css({
          background: '#4289ff',
          color: '#fff'
        });
        return;
      }
    }

    function setRange(range, prop, value) {
      if (!range || !range.startDay || !range.endDay) {
        range.diffDay = 0;
        return;
      }

      range.diffDay = 1;
      var RangeStartData = range.startDay.split('-');
      var RangeEndData = range.endDay.split('-');

      var y = 0;
      var m = 0;
      var diffM;
      var elmentLi;
      var crossY =
        parseInt(RangeEndData[0]) > parseInt(RangeStartData[0]) ? true : false;

      for (
        y;
        y <= parseInt(RangeEndData[0]) - parseInt(RangeStartData[0]);
        y++
      ) {
        currentDate.year = parseInt(RangeStartData[0]) + y;
        if (!crossY) {
          diffM = parseInt(RangeEndData[1]) - parseInt(RangeStartData[1]);
        }
        if (crossY) {
          if (y === 0) {
            diffM = 12 - parseInt(RangeStartData[1]);
          } else {
            diffM = parseInt(RangeEndData[1]) - 1;
          }
        }

        m = 0;
        for (m; m <= diffM; m++) {
          var d = 1;
          if (y === 0) {
            currentDate.month = parseInt(RangeStartData[1]) + m;
          }
          if (y === 1) {
            currentDate.month = m + 1;
          }
          var calendarDuration = getDuration(
            currentDate.year + '-' + currentDate.month
          );

          if (RangeStartData[1] === RangeEndData[1]) {
            currentDate.day = parseInt(RangeStartData[2]);
            for (
              d;
              d <= parseInt(RangeEndData[2]) - parseInt(RangeStartData[2]) - 1;
              d++
            ) {
              elmentLi = $(
                'ul[date="' + currentDate.year + '-' + currentDate.month + '"]'
              ).find(
                'li[date="' +
                  currentDate.year +
                  '-' +
                  currentDate.month +
                  '-' +
                  (currentDate.day + d) +
                  '"]'
              );

              if (!elmentLi.attr('isdisable')) {
                elmentLi.css(prop, value);
                range.diffDay = range.diffDay + 1;
              }
              if (prop === 'color') {
                elmentLi.attr('isdisable', 'true');
                elmentLi.off('click');
              }
            }
          }

          if (
            y === 0 &&
            parseInt(RangeStartData[1]) + m === parseInt(RangeStartData[1]) &&
            Math.abs(parseInt(RangeStartData[1]) - parseInt(RangeEndData[1])) >
              0
          ) {
            currentDate.day = parseInt(RangeStartData[2]);
            for (d; d <= calendarDuration - currentDate.day; d++) {
              elmentLi = $(
                'ul[date="' + currentDate.year + '-' + currentDate.month + '"]'
              ).find(
                'li[date="' +
                  currentDate.year +
                  '-' +
                  currentDate.month +
                  '-' +
                  (currentDate.day + d) +
                  '"]'
              );

              if (!elmentLi.attr('isdisable')) {
                elmentLi.css(prop, value);
                range.diffDay = range.diffDay + 1;
              }
              if (prop === 'color') {
                elmentLi.attr('isdisable', 'true');
                elmentLi.off('click');
              }
            }
          }

          if (
            (parseInt(RangeStartData[1]) + m > parseInt(RangeStartData[1]) &&
              parseInt(RangeStartData[1]) + m < parseInt(RangeEndData[1])) ||
            (y === 1 && currentDate.month < parseInt(RangeEndData[1])) ||
            (y === 0 &&
              currentDate.month > parseInt(RangeEndData[1]) &&
              parseInt(RangeStartData[1]) + m > parseInt(RangeStartData[1]))
          ) {
            for (d; d <= calendarDuration; d++) {
              elmentLi = $(
                'ul[date="' + currentDate.year + '-' + currentDate.month + '"]'
              ).find(
                'li[date="' +
                  currentDate.year +
                  '-' +
                  currentDate.month +
                  '-' +
                  d +
                  '"]'
              );

              if (!elmentLi.attr('isdisable')) {
                elmentLi.css(prop, value);
                range.diffDay = range.diffDay + 1;
              }
              if (prop === 'color') {
                elmentLi.attr('isdisable', 'true');
                elmentLi.off('click');
              }
            }
          }

          if (
            (parseInt(RangeStartData[1]) + m === parseInt(RangeEndData[1]) &&
              m > 0) ||
            (y === 1 && currentDate.month === parseInt(RangeEndData[1]))
          ) {
            currentDate.day = parseInt(RangeEndData[2]);
            for (d; d < currentDate.day; d++) {
              elmentLi = $(
                'ul[date="' + currentDate.year + '-' + currentDate.month + '"]'
              ).find(
                'li[date="' +
                  currentDate.year +
                  '-' +
                  currentDate.month +
                  '-' +
                  d +
                  '"]'
              );

              if (!elmentLi.attr('isdisable')) {
                elmentLi.css(prop, value);
                range.diffDay = range.diffDay + 1;
              }
              if (prop === 'color') {
                elmentLi.attr('isdisable', 'true');
                elmentLi.off('click');
              }
            }
          }

          if (prop === 'color') {
            $('li[date="' + range.startDay + '"]')
              .attr('isdisable', 'true')
              .css(prop, value)
              .off('click');
            $('li[date="' + range.endDay + '"]')
              .attr('isdisable', 'true')
              .css(prop, value)
              .off('click');
          }
        }
      }
    }

    function setRangeBackground(bgColor) {
      setRange(durationDay, 'background', bgColor);
    }

    function initBackground(bgColor) {
      setRange(durationDay, 'background', bgColor);
    }

    function setDisableDayRange(disableDayRange, initFn) {
      if (initFn && today.getDate() === 1) {
        return;
      }
      setRange(disableDayRange, 'color', '#cfcfcf');
    }

    function setEmptyWeekDay(currentDate) {
      var calendarFirstWeekDay = getMonthFirstWeekDay(
        currentDate.year + '-' + currentDate.month
      );
      for (var i = 1; i < calendarFirstWeekDay; i++) {
        var calendarLi = $('<li>');
        calendarUl.append(calendarLi);
      }
    }

    function saveDurationDay() {
      if (durationDay && durationDay.startDay && durationDay.endDay) {
        rightDurationDay.startDay = durationDay.startDay;
        rightDurationDay.endDay = durationDay.endDay;
        rightDurationDay.diffDay = durationDay.diffDay;
      }
    }

    function exportDurationDay() {
      if (
        (!durationDay || !durationDay.startDay || !durationDay.endDay) &&
        rightDurationDay.startDay &&
        rightDurationDay.endDay
      ) {
        durationDay.startDay = rightDurationDay.startDay;
        durationDay.endDay = rightDurationDay.endDay;
        durationDay.diffDay = rightDurationDay.diffDay;

        return true;
      }
    }

    function setEffectiveWeekDay() {
      var calendarDuration = getDuration(
        currentDate.year + '-' + currentDate.month
      );
      for (var i = 0; i < calendarDuration; i++) {
        var count = i + 1;
        var calendarLi = $('<li>');
        calendarLi.text(count);
        calendarLi.attr(
          'date',
          currentDate.year + '-' + currentDate.month + '-' + count
        );
        calendarLi.on('click', function() {
          initBackground('#fff');
          initNote();

          handleSelectedRange(this); // set durationDay

          setNote();
          setRangeBackground('#ebf4fa');

          saveDurationDay();

          if (durationDay.startDay && durationDay.endDay) {
            setTimeout(function() {
              closeCalendar();
            }, 500);
          }
        });
        calendarUl.append(calendarLi);
      }
    }

    function setCalendar() {
      for (var i = 0; i < 12; i++) {
        currentDate.month = currentDate.month + 1;
        setYearMonth(currentDate);
        setElements(currentDate);
        setEmptyWeekDay(currentDate);
        setEffectiveWeekDay(currentDate);
      }

      var initDisableRangeArr = {
        startDay: today.getFullYear() + '-' + (today.getMonth() + 1) + '-1',
        endDay:
          today.getFullYear() +
          '-' +
          (today.getMonth() + 1) +
          '-' +
          (today.getDate() - 1)
      };
      setDisableDayRange(initDisableRangeArr, true);
    }

    this.init = function() {
      setCalendar();
    };

    this.init();

    this.getStatus = function() {
      return status;
    };

    this.setDisableDays = function(data) {
      if (data instanceof Array) {
        for (var i = 0; i < data.length; i++) {
          setDisableDayRange({
            startDay: data[i],
            endDay: data[i]
          });
        }
      } else {
        setDisableDayRange(data);
      }
    };

    this.getDurationDay = function() {
      return durationDay;
    };

    this.openCalendar = openCalendar;

    this.closeCalendar = closeCalendar;
  }

  if (typeof exports == 'object') {
    module.exports = CalendarDate;
  } else if (typeof define == 'function' && define.amd) {
    define([], function() {
      return CalendarDate;
    });
  } else {
    window.CalendarDate = CalendarDate;
  }
})();
