import React, { useRef, useEffect, useCallback, useState } from 'react';

interface TimeWheelProps {
  values: number[];
  selectedValue: number;
  onValueChange: (value: number) => void;
  itemHeight: number;
  visibleItems: number;
}

const TimeWheel: React.FC<TimeWheelProps> = ({
  values,
  selectedValue,
  onValueChange,
  itemHeight,
  visibleItems,
}) => {
  const wheelRef = useRef<HTMLDivElement>(null);
  const scrollTimeoutRef = useRef<number | null>(null);
  const [isScrolling, setIsScrolling] = useState(false);

  const centerIndex = Math.floor(visibleItems / 2);
  const containerHeight = itemHeight * visibleItems;
  const paddingHeight = centerIndex * itemHeight;

  const scrollToValue = useCallback((value: number, smooth: boolean = true) => {
    if (!wheelRef.current) return;
    
    const valueIndex = values.indexOf(value);
    if (valueIndex === -1) return;
    
    // Calculate the scroll position to center the selected value
    const targetScrollTop = valueIndex * itemHeight;
    
    wheelRef.current.scrollTo({
      top: targetScrollTop,
      behavior: smooth ? 'smooth' : 'auto'
    });
  }, [values, itemHeight]);

  useEffect(() => {
    // Initial scroll to selected value without animation
    const timer = setTimeout(() => {
      scrollToValue(selectedValue, false);
    }, 0);
    
    return () => clearTimeout(timer);
  }, [selectedValue, scrollToValue]);

  const handleScroll = useCallback(() => {
    if (!wheelRef.current || isScrolling) return;
    
    setIsScrolling(true);
    
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }
    
    scrollTimeoutRef.current = setTimeout(() => {
      if (!wheelRef.current) return;
      
      const scrollTop = wheelRef.current.scrollTop;
      const nearestIndex = Math.round(scrollTop / itemHeight);
      const clampedIndex = Math.max(0, Math.min(nearestIndex, values.length - 1));
      const newValue = values[clampedIndex];
      
      if (newValue !== selectedValue) {
        onValueChange(newValue);
      }
      
      // Ensure perfect centering
      scrollToValue(newValue, true);
      
      setTimeout(() => setIsScrolling(false), 100);
    }, 150);
  }, [values, itemHeight, selectedValue, onValueChange, scrollToValue, isScrolling]);

  const handleItemClick = (value: number) => {
    onValueChange(value);
    scrollToValue(value, true);
  };

  return (
    <div className="relative">
      <div
        ref={wheelRef}
        className="w-20 overflow-y-scroll scrollbar-hide"
        style={{ 
          height: `${containerHeight}px`,
          scrollbarWidth: 'none',
          msOverflowStyle: 'none'
        }}
        onScroll={handleScroll}
      >
        {/* Top padding to center first item */}
        <div style={{ height: `${paddingHeight}px` }} />
        
        {values.map((num) => {
          const isSelected = num === selectedValue;
          
          return (
            <div
              key={num}
              className={`flex items-center justify-center text-lg cursor-pointer transition-all duration-200 ease-out select-none ${
                isSelected 
                  ? 'text-blue-600 font-bold scale-110' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              style={{ height: `${itemHeight}px` }}
              onClick={() => handleItemClick(num)}
            >
              {String(num).padStart(2, '0')}
            </div>
          );
        })}
        
        {/* Bottom padding to center last item */}
        <div style={{ height: `${paddingHeight}px` }} />
      </div>
      
      {/* Selection indicator - perfectly centered */}
      <div 
        className="absolute left-0 right-0 border-t-2 border-b-2 border-blue-400 pointer-events-none bg-blue-50 bg-opacity-20"
        style={{ 
          height: `${itemHeight}px`,
          top: `${centerIndex * itemHeight}px`
        }}
      />
      
      {/* Fade overlays */}
      <div 
        className="absolute top-0 left-0 right-0 pointer-events-none"
        style={{
          height: `${paddingHeight}px`,
          background: 'linear-gradient(to bottom, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.5) 70%, rgba(255,255,255,0) 100%)',
        }}
      />
      <div 
        className="absolute bottom-0 left-0 right-0 pointer-events-none"
        style={{
          height: `${paddingHeight}px`,
          background: 'linear-gradient(to top, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.5) 70%, rgba(255,255,255,0) 100%)',
        }}
      />
    </div>
  );
};

export default TimeWheel;