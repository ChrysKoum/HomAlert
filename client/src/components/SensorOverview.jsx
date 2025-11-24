import React from 'react';
import LargeSensorCard from './sensors/LargeSensorCard';
import SmallSensorCard from './sensors/SmallSensorCard';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation'; // Ensure navigation CSS is imported

// Import Navigation module
import { Navigation } from 'swiper/modules';

const SensorOverview = ({ sensors }) => {
  const getCardType = (sensorKey) => {
    // ... existing getCardType logic ...
    switch (sensorKey?.toLowerCase()) {
      case 'water':
      case 'gas':
      case 'temperature':
      case 'humidity':
        return 'large';
      case 'fire':
      case 'motion':
      case 'smoke':
      case 'door':
      case 'window':
      case 'earthquake':
        return 'small';
      default:
        if (sensors[sensorKey]?.value || sensors[sensorKey]?.moistureLevel || sensors[sensorKey]?.ppm) {
            return 'large';
        }
        return 'small';
    }
  };

  const sensorKeys = Object.keys(sensors);

  return (
    // Added w-full for robustness, ensuring it takes available width
    <div className="overflow-hidden max-w-screen-xl relative group">
      <Swiper
        modules={[Navigation]} // Add the Navigation module
        spaceBetween={16}
        slidesPerView={'auto'}
        navigation // Enable navigation arrows
        className="py-2"
        // Optional: Add custom class names for arrows if needed for styling
        // navigation={{
        //   nextEl: '.swiper-button-next',
        //   prevEl: '.swiper-button-prev',
        // }}
      >
        {sensorKeys.map((sensorKey) => {
          const cardType = getCardType(sensorKey);
          const sensorData = sensors[sensorKey];

          return (
            <SwiperSlide key={sensorKey} style={{ width: 'auto' }}>
              {cardType === 'large' ? (
                <LargeSensorCard sensorType={sensorKey} data={sensorData} />
              ) : (
                <SmallSensorCard sensorType={sensorKey} data={sensorData} />
              )}
            </SwiperSlide>
          );
        })}
        {/* Swiper automatically adds divs for navigation buttons when 'navigation' is true */}
        {/* You can add custom styled buttons and link them via navigation prop options */}
        {/* Example for custom buttons (requires more setup): */}
        {/* <div className="swiper-button-prev absolute top-1/2 left-2 transform -translate-y-1/2 z-10 cursor-pointer p-2 bg-white rounded-full shadow opacity-0 group-hover:opacity-100 transition-opacity">Prev</div> */}
        {/* <div className="swiper-button-next absolute top-1/2 right-2 transform -translate-y-1/2 z-10 cursor-pointer p-2 bg-white rounded-full shadow opacity-0 group-hover:opacity-100 transition-opacity">Next</div> */}
      </Swiper>
    </div>
  );
};

export default SensorOverview;