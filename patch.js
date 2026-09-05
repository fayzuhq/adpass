const fs = require('fs');
const file = 'adpass-dashboard/src/app/v/[slug]/page.tsx';
let content = fs.readFileSync(file, 'utf8');

// 1. Timer logic
content = content.replace(
  /const \[timeLeft, setTimeLeft\] = useState\(13338\);[^]*?const seconds = timeLeft % 60;/m,
  `const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    if (!isAgeVerified) return;

    const calculateTimeLeft = () => {
      const now = new Date();
      const endOfDay = new Date(now);
      endOfDay.setHours(23, 59, 59, 999);
      return Math.floor((endOfDay.getTime() - now.getTime()) / 1000);
    };

    setTimeLeft(calculateTimeLeft());

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, [isAgeVerified]);

  const hours = Math.floor(timeLeft / 3600);
  const minutes = Math.floor((timeLeft % 3600) / 60);
  const seconds = timeLeft % 60;`
);

// Tabular nums font mono
content = content.replace(
  /className="text-5xl font-mono font-bold text-white tracking-tighter mb-2"/,
  'className="text-5xl tabular-nums font-mono font-bold text-white tracking-tighter mb-2"'
);

// 2. Bank inputs states
content = content.replace(
  /const \[isProcessing, setIsProcessing\] = useState\(false\);/,
  `const [isProcessing, setIsProcessing] = useState(false);
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value.replace(/\\D/g, '');
    if (val.length > 16) val = val.slice(0, 16);
    const formatted = val.match(/.{1,4}/g)?.join(' ') || val;
    setCardNumber(formatted);
  };

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value.replace(/\\D/g, '');
    if (val.length > 4) val = val.slice(0, 4);
    if (val.length > 2) {
      val = \`\${val.slice(0, 2)}/\${val.slice(2)}\`;
    }
    setExpiry(val);
  };

  const handleCvcChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value.replace(/\\D/g, '');
    if (val.length > 3) val = val.slice(0, 3);
    setCvc(val);
  };`
);

// Bank inputs UI
content = content.replace(
  /<div className="space-y-4">[^]*?<\/div>\s*<\/div>/m,
  `<div className="space-y-4">
            <div className="space-y-2">
              <label className="text-xs font-medium text-zinc-400">Numéro de carte</label>
              <div className="relative">
                <Input required placeholder="0000 0000 0000 0000" className="pl-10 pr-20 font-mono" disabled={isProcessing} value={cardNumber} onChange={handleCardNumberChange} />
                <CreditCard className="w-4 h-4 absolute left-3 top-3 text-muted-foreground" />
                <div className="absolute right-3 top-2.5 flex gap-1 select-none pointer-events-none">
                  <span className="bg-blue-600 text-white text-[9px] font-bold px-1.5 py-0.5 rounded leading-none">VISA</span>
                  <span className="bg-orange-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded leading-none">MC</span>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-medium text-zinc-400">Expiration</label>
                <Input required placeholder="MM/AA" className="font-mono" disabled={isProcessing} value={expiry} onChange={handleExpiryChange} />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-medium text-zinc-400">CVC</label>
                <Input required placeholder="123" className="font-mono" type="password" disabled={isProcessing} value={cvc} onChange={handleCvcChange} />
              </div>
            </div>
          </div>`
);

// 3. Background blur and content
content = content.replace(
  /blur-2xl opacity-40 select-none pointer-events-none/,
  `blur-xl opacity-30 select-none pointer-events-none`
);

content = content.replace(
  /<header className="p-6 border-b border-white\/10 flex items-center justify-between">[^]*?<\/header>/m,
  `<header className="p-6 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-rose-500/20 flex items-center justify-center">
              <Lock className="w-4 h-4 text-rose-500" />
            </div>
            <span className="font-bold text-xl tracking-tight">PassLocker</span>
            <Badge variant="outline" className="text-rose-500 border-rose-500/30 bg-rose-500/10 px-2 py-0.5 text-[10px] font-bold tracking-widest ml-2">
              18+ EXCLUSIF
            </Badge>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium text-zinc-400 hidden sm:block">Galerie Privée</span>
            <div className="w-10 h-10 rounded-full bg-zinc-800" />
          </div>
        </header>`
);

content = content.replace(
  /<div className="aspect-video w-full bg-zinc-900 rounded-2xl flex items-center justify-center border border-white\/10 relative overflow-hidden">[^]*?<\/div>/m,
  `<div className="aspect-video w-full bg-zinc-950 rounded-2xl flex items-center justify-center border border-white/10 relative overflow-hidden shadow-2xl">
             <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
             <PlayCircle className="w-32 h-32 text-white/50 relative z-10" />
          </div>`
);

content = content.replace(
  /<div className="grid grid-cols-2 md:grid-cols-4 gap-4">[^]*?<\/div>/m,
  `<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
             {[1, 2, 3, 4].map(i => (
               <div key={i} className="aspect-square bg-zinc-900 rounded-xl relative border border-white/5 overflow-hidden flex items-center justify-center">
                 <div className="absolute inset-0 bg-black/20" />
                 <Lock className="w-6 h-6 text-rose-500/60 relative z-10" />
               </div>
             ))}
          </div>`
);

fs.writeFileSync(file, content, 'utf8');
