import React, { useState } from 'react';
import { DatePicker, Space } from 'antd';
import dayjs from 'dayjs';
import './CampaignTiming.css';

const { RangePicker } = DatePicker;

function DateRangePickerCustom(props) {
  const { setSelectedDate } = props;
  const [open, setOpen] = useState(true);

  const disabledDate = (current) => current && current < dayjs().endOf('day');

  const handleOpenChange = (isOpen) => {
    if (!isOpen) {
      setOpen(true);
    }
  };

  const handleDateChange = (dates) => {
    const awsDateTimes = dates.map((date) => dayjs(date).toISOString());
    setSelectedDate(awsDateTimes);
  };

  return (
    <div className="dateRangeCustomize relative mt-20">
      <Space direction="vertical" size={12} style={{ width: '35%' }}>
        <RangePicker
          size="large"
          disabledDate={disabledDate}
          open={open}
          onChange={handleDateChange}
          onOpenChange={handleOpenChange}
          style={{ width: '100%', position: 'relative' }}
          getPopupContainer={(triggerNode) => triggerNode.parentNode}
          suffixIcon={false}
        />
      </Space>
    </div>
  );
}

export default DateRangePickerCustom;
