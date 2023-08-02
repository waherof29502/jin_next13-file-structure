import Calendar from '@/components/Calendar/calendar';
import Calendar2 from '@/components/Calendar/calendar2';
import { FC } from 'react';

const page: FC = () => {
  return (
    <div className="flex flex-col">
      <Calendar />
      <Calendar2 />
    </div>
  );
};

export default page;
