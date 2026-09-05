const fs = require('fs');
const file = 'adpass-dashboard/src/app/v/[slug]/page.tsx';
let content = fs.readFileSync(file, 'utf8');

content = content.replace(
  /<div className="space-y-4">[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/,
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

fs.writeFileSync(file, content, 'utf8');
