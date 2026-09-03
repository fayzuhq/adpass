import re

with open('adpass-dashboard/src/app/links/page.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Fix the broken TabsList structure created by the merge diff
content = content.replace('''          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsTrigger value="all" className="data-[state=active]:bg-primary data-[state=active]:text-white">Tous les liens</TabsTrigger>
                <TabsTrigger value="chill" className="data-[state=active]:bg-primary data-[state=active]:text-white">Liens Chill</TabsTrigger>
                <TabsTrigger value="nsfw" className="data-[state=active]:bg-pink-600 data-[state=active]:text-white">Liens NSFW</TabsTrigger>
              </TabsList>
            </div>''', '''          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">''')

with open('adpass-dashboard/src/app/links/page.tsx', 'w', encoding='utf-8') as f:
    f.write(content)
