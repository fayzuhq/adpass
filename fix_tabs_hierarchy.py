import re

def fix_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Define the pattern to replace
    # We want to replace the `<div> <Tabs> <TabsList> ... </TabsList> </Tabs> <Search> ... </div> <Tabs>`
    # With a single `<Tabs>` wrapping everything.

    # Let's do it specifically for links/page.tsx
    if "app/links/page.tsx" in filepath:
        old_block = """          <div className="p-4 sm:p-0 mb-6 flex flex-col sm:flex-row justify-between gap-4">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full sm:w-auto">
              <TabsList className="bg-white/5 border border-white/10 p-1 rounded-lg w-full sm:w-auto">
                <TabsTrigger value="all" className="data-[state=active]:bg-primary data-[state=active]:text-white">Tous les liens</TabsTrigger>
                <TabsTrigger value="chill" className="data-[state=active]:bg-primary data-[state=active]:text-white">Liens Chill</TabsTrigger>
                <TabsTrigger value="nsfw" className="data-[state=active]:bg-pink-600 data-[state=active]:text-white">Liens NSFW</TabsTrigger>
              </TabsList>
            </Tabs>
            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 absolute left-3 top-3 text-muted-foreground" />
              <Input
                placeholder="Rechercher une campagne ou URL..."
                className="pl-9 bg-white/5 border-white/10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">"""

        new_block = """          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="p-4 sm:p-0 mb-6 flex flex-col sm:flex-row justify-between gap-4">
              <TabsList className="bg-white/5 border border-white/10 p-1 rounded-lg w-full sm:w-auto">
                <TabsTrigger value="all" className="data-[state=active]:bg-primary data-[state=active]:text-white">Tous les liens</TabsTrigger>
                <TabsTrigger value="chill" className="data-[state=active]:bg-primary data-[state=active]:text-white">Liens Chill</TabsTrigger>
                <TabsTrigger value="nsfw" className="data-[state=active]:bg-pink-600 data-[state=active]:text-white">Liens NSFW</TabsTrigger>
              </TabsList>
              <div className="relative w-full sm:w-72">
                <Search className="w-4 h-4 absolute left-3 top-3 text-muted-foreground" />
                <Input
                  placeholder="Rechercher une campagne ou URL..."
                  className="pl-9 bg-white/5 border-white/10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>"""

        content = content.replace(old_block, new_block)

    elif "app/admin/links/page.tsx" in filepath:
        old_block = """          <div className="p-4 sm:p-0 mb-6 flex flex-col sm:flex-row justify-between gap-4">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full sm:w-auto">
              <TabsList className="bg-white/5 border border-white/10 p-1 rounded-lg w-full sm:w-auto">
                <TabsTrigger value="pending" className="data-[state=active]:bg-rose-500 data-[state=active]:text-white">En attente de validation</TabsTrigger>
                <TabsTrigger value="active" className="data-[state=active]:bg-zinc-800 data-[state=active]:text-white">Liens actifs</TabsTrigger>
                <TabsTrigger value="rejected" className="data-[state=active]:bg-zinc-800 data-[state=active]:text-white">Liens rejetés</TabsTrigger>
              </TabsList>
            </Tabs>
            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 absolute left-3 top-3 text-muted-foreground" />
              <Input
                placeholder="Rechercher par affilié, campagne..."
                className="pl-9 bg-white/5 border-white/10 border-rose-500/10 focus:ring-rose-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">"""

        new_block = """          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="p-4 sm:p-0 mb-6 flex flex-col sm:flex-row justify-between gap-4">
              <TabsList className="bg-white/5 border border-white/10 p-1 rounded-lg w-full sm:w-auto">
                <TabsTrigger value="pending" className="data-[state=active]:bg-rose-500 data-[state=active]:text-white">En attente de validation</TabsTrigger>
                <TabsTrigger value="active" className="data-[state=active]:bg-zinc-800 data-[state=active]:text-white">Liens actifs</TabsTrigger>
                <TabsTrigger value="rejected" className="data-[state=active]:bg-zinc-800 data-[state=active]:text-white">Liens rejetés</TabsTrigger>
              </TabsList>
              <div className="relative w-full sm:w-72">
                <Search className="w-4 h-4 absolute left-3 top-3 text-muted-foreground" />
                <Input
                  placeholder="Rechercher par affilié, campagne..."
                  className="pl-9 bg-white/5 border-white/10 border-rose-500/10 focus:ring-rose-500"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>"""
        content = content.replace(old_block, new_block)

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

fix_file('adpass-dashboard/src/app/links/page.tsx')
fix_file('adpass-dashboard/src/app/admin/links/page.tsx')
