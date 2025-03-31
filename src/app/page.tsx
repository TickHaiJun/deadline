"use client";
import { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import 'dayjs/locale/zh-cn';
import AnimatedBeam from '@/components/animata/background/animated-beam'
import Profile from '@/components/animata/widget/profile'
import BlurryBlob from '@/components/animata/background/blurry-blob'
import GlowingCard from '@/components/animata/card/glowing-card'

dayjs.extend(customParseFormat);
dayjs.locale('zh-cn');

interface Festival {
  label: string;
  currentTime: string;
  remainingWeek?: string;
  remainingTime?: string;
}

const festivals: Festival[] = [
  // { label: '海军的生日', currentTime: '2025-05-11' },
  // { label: '光棍节', currentTime: '2024-11-11' },
  { label: '清明节', currentTime: '2025-04-04' },
  { label: '劳动节', currentTime: '2025-05-01' },
  { label: '端午节', currentTime: '2025-05-31' },                                                                                                     
  { label: '中秋节', currentTime: '2025-09-29' },
  { label: '国庆节', currentTime: '2025-10-01' },
  { label: '元旦', currentTime: '2026-01-01' },
  { label: '春节', currentTime: '2026-02-17' },
  { label: '元宵节', currentTime: '2026-03-03' },
];

const calculateRemainingTime = (festival: Festival, now: dayjs.Dayjs) => {
  const festivalDate = dayjs(festival.currentTime, 'YYYY-MM-DD', true);

  if (!festivalDate.isValid()) {
    console.error(`Invalid date for festival: ${festival.label}, date: ${festival.currentTime}`);
    festival.remainingWeek = '日期无效';
    festival.remainingTime = '日期无效';
    return;
  }

  const remainingDays = festivalDate.diff(now, 'day');
  const remainingHours = festivalDate.diff(now, 'hour') % 24;
  const remainingMinutes = festivalDate.diff(now, 'minute') % 60;
  const remainingSeconds = festivalDate.diff(now, 'second') % 60;

  const weeks = Math.floor(remainingDays / 7);
  const days = remainingDays % 7;

  festival.remainingWeek = `${weeks} 星期 ${days} 天`;
  festival.remainingTime = `${remainingDays} 天 ${String(remainingHours).padStart(2, '0')} 小时 ${String(remainingMinutes).padStart(2, '0')} 分钟 ${String(remainingSeconds).padStart(2, '0')} 秒`;
};

export default function Times() {
  // 使用 null 作为初始值
  const [currentTime, setCurrentTime] = useState<dayjs.Dayjs | null>(null);
  // 添加一个状态来控制客户端渲染
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // 标记为客户端渲染
    setIsClient(true);
    setCurrentTime(dayjs());
    const timer = setInterval(() => {
      setCurrentTime(dayjs());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // 只在有 currentTime 时计算节日时间
  useEffect(() => {
    if (currentTime) {
      festivals.forEach(festival => calculateRemainingTime(festival, currentTime));
    }
  }, [currentTime]);

  return (
    //   backgroundSize: 'cover'
    <div className="w-screen min-h-screen bg-cover bg-center bg-no-repeat  " style={{ backgroundImage: `url('/assets/cjdjs.png')`, }}>
<img src="https://count.getloli.com/@haijun?name=haijun&theme=miku&padding=7&offset=0&align=top&scale=1&pixelated=1&darkmode=auto" alt=":name" />
{/* 
      <div className="lantern-box">
        <div className="lantern">
          <div className="lantern-line"></div>
          <div className="lantern-main">
            <div className="lantern-rect">
              <div className="lantern-text">节</div>
            </div>
          </div>
          <div className="lantern-tassel lantern-tassel-top">
            <div className="lantern-tassel-bottom"></div>
            <div className="lantern-tassel-middle"></div>
          </div>
        </div>
      </div> */}

{/* https://count.getloli.com/@haijun?name=haijun&theme=miku&padding=7&offset=0&align=top&scale=1&pixelated=1&darkmode=auto */}

{/* <img src="https://count.getloli.com/@haijun?name=haijun&theme=miku&padding=7&offset=0&align=top&scale=1&pixelated=1&darkmode=auto" alt=":name" />
      <div className="lantern-box lantern-box1">
        <div className="lantern">
          <div className="lantern-line"></div>
          <div className="lantern-main">
            <div className="lantern-rect">
              <div className="lantern-text">春</div>
            </div>
          </div>
          <div className="lantern-tassel lantern-tassel-top">
            <div className="lantern-tassel-bottom"></div>
            <div className="lantern-tassel-middle"></div>
          </div>
        </div>
      </div>

      <div className="lantern-box lantern-box2">
        <div className="lantern">
          <div className="lantern-line"></div>
          <div className="lantern-main">
            <div className="lantern-rect">
              <div className="lantern-text">度</div>
            </div>
          </div>
          <div className="lantern-tassel lantern-tassel-top">
            <div className="lantern-tassel-bottom"></div>
            <div className="lantern-tassel-middle"></div>
          </div>
        </div>
      </div>

      <div className="lantern-box lantern-box3">
        <div className="lantern">
          <div className="lantern-line"></div>
          <div className="lantern-main">
            <div className="lantern-rect">
              <div className="lantern-text">欢</div>
            </div>
          </div>
          <div className="lantern-tassel lantern-tassel-top">
            <div className="lantern-tassel-bottom"></div>
            <div className="lantern-tassel-middle"></div>
          </div>
        </div>
      </div> */}

      {/* <img src="https://upcdn.maowu.com/cjdjs.png"></img> */}
      <div className="w-full h-[260px] flex items-center   justify-between text-3xl text-white px-5">
        <div className="flex flex-col items-start">
          <span>打工人放假倒计时服务</span>
          <span className="text-xl mt-2">Your exclusive countdown timer</span>
        </div>

      </div>
      <div className="text-xl text-center pt-2 text-white flex items-center justify-center">
      {/* <Profile  /> */}
        {/* 当前时间: {currentTime?.format('YYYY年MM月DD日 HH:mm:ss') || '加载中...'} */}
      </div>
      <div className="w-full flex flex-wrap justify-center">
        {/* 只在客户端渲染时显示内容 */}
        {isClient && festivals.map((festival, index) => {
          const festivalDate = dayjs(festival.currentTime, 'YYYY-MM-DD', true);
          return (
            <div key={index} className='w-[224px] m-2'>
              <GlowingCard
                label={festival.label}
                time={festivalDate.isValid() ? festivalDate.format('YYYY年MM月DD日') : '日期无效'}
                remainingWeek={festival.remainingWeek}
                remainingTime={festival.remainingTime}
              />
            </div>
          );
        })}
      </div>



    </div>
  )
}