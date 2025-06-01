import React, { useState } from 'react';
import { Box, Button, Popover, PopoverTrigger, PopoverContent, PopoverArrow, PopoverCloseButton, PopoverHeader, PopoverBody } from '@chakra-ui/react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // Import calendar styles
import { DownloadIcon } from '@chakra-ui/icons';

const PopupCalendar = () => {
  const [date, setDate] = useState([new Date(), new Date()]);

  const onDateChange = (selectedDate) => {
    setDate(selectedDate);
    console.log('Selected Date:', selectedDate);
  };

  return (
    <Box>
      <Popover>
        <PopoverTrigger>
          <Button>
            {date[0] ? date[0].toDateString() : 'None'} - {date[1] ? date[1].toDateString() : 'None'}
            <svg style={{marginLeft:10}} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-down" viewBox="0 0 16 16">
              <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708" />
            </svg>

          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <PopoverArrow />
          <PopoverCloseButton />
          <PopoverHeader>Select a Date</PopoverHeader>
          <PopoverBody>
            <Calendar selectRange={true} value={date} onChange={onDateChange} />
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </Box>
  );
};

export default PopupCalendar;
