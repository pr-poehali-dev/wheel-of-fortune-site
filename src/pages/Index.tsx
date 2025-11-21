import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import Icon from '@/components/ui/icon';

const segments = [
  { discount: '5%', color: '#C41E3A' },
  { discount: '10%', color: '#165B33' },
  { discount: '15%', color: '#C41E3A' },
  { discount: '20%', color: '#165B33' },
  { discount: 'Крути ещё раз!', color: '#FFD700' },
  { discount: '5%', color: '#165B33' },
  { discount: '10%', color: '#C41E3A' },
  { discount: '15%', color: '#165B33' },
];

const Index = () => {
  const [rotation, setRotation] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState('');
  const [showSnow, setShowSnow] = useState(true);

  const spinWheel = () => {
    if (isSpinning) return;

    setIsSpinning(true);
    const randomSegment = Math.floor(Math.random() * segments.length);
    const segmentAngle = 360 / segments.length;
    const targetRotation = rotation + 360 * 5 + (randomSegment * segmentAngle) + segmentAngle / 2;

    setRotation(targetRotation);

    setTimeout(() => {
      setIsSpinning(false);
      setResult(segments[randomSegment].discount);
      setShowResult(true);
    }, 4000);
  };

  const snowflakes = showSnow ? Array.from({ length: 30 }, (_, i) => (
    <div
      key={i}
      className="absolute text-white/60 pointer-events-none"
      style={{
        left: `${Math.random() * 100}%`,
        top: `-10vh`,
        fontSize: `${Math.random() * 10 + 10}px`,
        animationDelay: `${Math.random() * 10}s`,
        animationDuration: `${Math.random() * 5 + 8}s`,
        animation: 'snowfall linear infinite',
      }}
    >
      ❄
    </div>
  )) : null;

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-b from-[#0d3b52] via-[#1a4d66] to-[#0d3b52]">
      {snowflakes}

      <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />
      
      <div className="absolute top-10 left-10 text-accent animate-twinkle text-2xl">✨</div>
      <div className="absolute top-32 right-20 text-accent animate-twinkle text-3xl" style={{ animationDelay: '0.5s' }}>⭐</div>
      <div className="absolute bottom-20 left-32 text-accent animate-twinkle text-2xl" style={{ animationDelay: '1s' }}>✨</div>
      <div className="absolute bottom-40 right-10 text-accent animate-twinkle text-3xl" style={{ animationDelay: '1.5s' }}>⭐</div>

      <div className="container mx-auto px-4 py-12 relative z-10">
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-7xl font-montserrat font-black text-white mb-4 drop-shadow-2xl">
            🎄 Колесо Фортуны 🎁
          </h1>
          <p className="text-xl md:text-2xl text-white/90 font-rubik font-medium">
            Крути колесо и получи свою новогоднюю скидку!
          </p>
        </div>

        <div className="flex flex-col items-center justify-center gap-8">
          <div className="relative">
            <div className="absolute -inset-8 bg-accent/20 rounded-full blur-3xl animate-pulse-glow" />
            
            <div className="relative w-[400px] h-[400px] md:w-[500px] md:h-[500px]">
              <div 
                className="absolute inset-0 rounded-full transition-transform duration-[4000ms] ease-out"
                style={{ 
                  transform: `rotate(${rotation}deg)`,
                  boxShadow: '0 0 60px rgba(255, 215, 0, 0.5), 0 0 120px rgba(196, 30, 58, 0.3)',
                }}
              >
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  {segments.map((segment, index) => {
                    const angle = (360 / segments.length) * index;
                    const nextAngle = (360 / segments.length) * (index + 1);
                    
                    const x1 = 50 + 48 * Math.cos((angle * Math.PI) / 180);
                    const y1 = 50 + 48 * Math.sin((angle * Math.PI) / 180);
                    const x2 = 50 + 48 * Math.cos((nextAngle * Math.PI) / 180);
                    const y2 = 50 + 48 * Math.sin((nextAngle * Math.PI) / 180);

                    const textAngle = angle + 360 / segments.length / 2;
                    const textX = 50 + 30 * Math.cos((textAngle * Math.PI) / 180);
                    const textY = 50 + 30 * Math.sin((textAngle * Math.PI) / 180);

                    return (
                      <g key={index}>
                        <path
                          d={`M 50 50 L ${x1} ${y1} A 48 48 0 0 1 ${x2} ${y2} Z`}
                          fill={segment.color}
                          stroke="#fff"
                          strokeWidth="0.5"
                        />
                        <text
                          x={textX}
                          y={textY}
                          fill="white"
                          fontSize="4"
                          fontWeight="bold"
                          textAnchor="middle"
                          dominantBaseline="middle"
                          transform={`rotate(${textAngle}, ${textX}, ${textY})`}
                          className="font-montserrat"
                        >
                          {segment.discount}
                        </text>
                      </g>
                    );
                  })}
                  <circle cx="50" cy="50" r="8" fill="#FFD700" stroke="#fff" strokeWidth="1" />
                </svg>
              </div>

              <div 
                className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-6 z-20"
                style={{ filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))' }}
              >
                <div className="w-0 h-0 border-l-[20px] border-r-[20px] border-t-[40px] border-l-transparent border-r-transparent border-t-accent" />
              </div>
            </div>
          </div>

          <Button
            size="lg"
            onClick={spinWheel}
            disabled={isSpinning}
            className="text-2xl px-12 py-8 font-montserrat font-bold bg-primary hover:bg-primary/90 text-white shadow-2xl transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed border-4 border-accent/50"
          >
            {isSpinning ? (
              <span className="flex items-center gap-3">
                <Icon name="Sparkles" className="animate-spin" size={28} />
                Крутим...
              </span>
            ) : (
              <span className="flex items-center gap-3">
                <Icon name="Gift" size={28} />
                Крутить колесо!
              </span>
            )}
          </Button>
        </div>
      </div>

      <Dialog open={showResult} onOpenChange={setShowResult}>
        <DialogContent className="bg-card border-4 border-accent max-w-md">
          <DialogHeader>
            <DialogTitle className="text-3xl font-montserrat font-black text-primary text-center mb-2">
              🎉 Поздравляем! 🎉
            </DialogTitle>
            <DialogDescription className="text-center">
              <div className="my-6">
                <div className="text-6xl font-montserrat font-black text-primary mb-2">
                  {result}
                </div>
                <p className="text-lg text-muted-foreground font-rubik">
                  {result === 'Крути ещё раз!' 
                    ? 'Попробуй свою удачу снова!' 
                    : 'Ваша новогодняя скидка!'
                  }
                </p>
              </div>
              <Button
                onClick={() => setShowResult(false)}
                className="w-full bg-secondary hover:bg-secondary/90 text-white font-montserrat font-bold text-lg py-6"
              >
                Отлично!
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Index;
