import os
import html
import re

base_path = "c:/Users/Dell/Downloads/Hexa UI"
index_path = os.path.join(base_path, "index.html")

# The precise base template provided by the user in the prompt
base_template = """<!DOCTYPE html>
<html lang="en" class="h-full bg-black">

<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>YakaUI - High Fidelity Atmospheric UI</title>
    <link rel="icon" type="image/png" href="/image.png">

    <!-- Google Fonts: Outfit -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&display=swap" rel="stylesheet">

    <!-- Scripts -->
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>

    <style type="text/tailwindcss">
        @layer base {
            body {
                @apply bg-black text-white antialiased overflow-x-hidden;
                font-family: 'Outfit', sans-serif;
            }
        }

        /* --- THE MASTER ATMOSPHERIC ENGINE --- */
        
        .bg-system {
            position: fixed;
            inset: 0;
            z-index: 0;
            background: #000;
            overflow: hidden;
            pointer-events: none;
        }

        /* Master Glow - Single Top Layer */
        .atm-glow-master {
            position: absolute;
            top: 0;
            left: 50%;
            transform: translateX(-50%);
            width: 100%;
            max-width: 1920px; /* Constrain to standard HD width to avoid ultrawide stretch */
            height: 100vh;
            background-image: url('/bg-top.c54a3f7e.jpg');
            background-repeat: no-repeat;
            background-position: top center;
            background-size: 100% auto;
            opacity: 1;
            mix-blend-mode: screen;
            z-index: 1;
            pointer-events: none;
            /* Soft fade out at the bottom only */
            -webkit-mask-image: linear-gradient(to bottom, rgba(0,0,0,1) 50%, rgba(0,0,0,0) 100%);
            mask-image: linear-gradient(to bottom, rgba(0,0,0,1) 50%, rgba(0,0,0,0) 100%);
        }

        /* Layer 3: Noise Texture */
        .atm-layer-noise {
            position: absolute;
            inset: 0;
            z-index: 5;
            background-image: url('/bg-noise.67fd2524.png');
            background-repeat: repeat;
            opacity: 0.04;
            pointer-events: none;
        }

        /* Layer 4: Bottom Glow (Footer Area) */
        .atm-glow-bottom {
            position: absolute;
            bottom: 0; /* Align perfectly to bottom */
            left: 50%;
            transform: translateX(-50%);
            width: 100%;
            height: 800px; /* Sufficient height to cover footer */
            background-image: url('/bg-bottom.e4e0724b.jpg');
            background-repeat: no-repeat;
            background-position: bottom center;
            background-size: cover;
            opacity: 0.8; /* Increased visibility */
            mix-blend-mode: screen;
            z-index: 1;
            pointer-events: none;
            /* Softer blend upwards, ensuring bottom is fully visible */
            -webkit-mask-image: linear-gradient(to top, rgba(0,0,0,1) 30%, rgba(0,0,0,0) 100%);
            mask-image: linear-gradient(to top, rgba(0,0,0,1) 30%, rgba(0,0,0,0) 100%);
        }

        /* Layer 0: Structural Grid */
        .grid-matrix {
            @apply pointer-events-none absolute inset-0 z-10 px-4 sm:px-6;
        }

        .vertical-lines {
            @apply mx-auto flex h-full max-w-[calc(80rem+2px)] gap-[14px];
        }

        .v-line {
            @apply flex-1 border-x border-white/5;
        }

        /* --- UI COMPONENT STYLING --- */

        .app-shell {
            position: relative;
            z-index: 10;
        }

        .header-blueprint {
            @apply flex h-20 items-center justify-between px-10 max-w-7xl mx-auto border-b border-white/5;
        }

        .hero-blueprint {
            @apply px-10 pt-10 pb-24 max-w-7xl mx-auto;
        }

        /* The Main Rounded Content Floor */
        .content-panel {
            @apply mt-0 rounded-t-[2.5rem] bg-[#050505]/60 backdrop-blur-[120px] border-t border-white/5 shadow-2xl;
            min-height: 100vh;
            position: relative;
            box-shadow: 0 -30px 100px -20px rgba(0,0,0,1);
            display: flex;
            flex-direction: column;
        }
    </style>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
</head>

<body class="relative min-h-full">

    <!-- Atmospheric Foundation (Bottom Layers) -->
    <div class="bg-system">
        <div class="atm-glow-master"></div>
        <div class="atm-glow-bottom"></div>
        <div class="atm-layer-noise"></div>

        <!-- Grid Skeleton Layer -->
        <div class="grid-matrix">
            <div class="vertical-lines">
                <div class="v-line border-white/10"></div>
                <div class="v-line hidden sm:block"></div>
                <div class="v-line hidden lg:block"></div>
            </div>
        </div>
    </div>

    <!-- Interface Layer (On Top) -->
    <div class="app-shell">
        <header class="header-blueprint">
            <div class="flex items-center gap-6">
                <div class="flex items-center gap-3">
                    <img src="/image.png" alt="Logo" class="h-8 w-8">
                    <span class="text-xl font-bold tracking-tight uppercase">YakaUI</span>
                </div>
                <div class="relative group">
                    <button
                        class="flex items-center gap-2 rounded-2xl bg-white/5 py-1.5 px-3 border border-white/5 backdrop-blur-md hover:bg-white/10 transition-colors">
                        <span class="text-[10px] font-bold text-white/80 tracking-widest uppercase">v1.0 (Latest)</span>
                        <svg class="w-3 h-3 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7">
                            </path>
                        </svg>
                    </button>
                    <!-- Dropdown Menu -->
                    <div
                        class="absolute top-full right-0 mt-2 w-32 bg-black/60 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl overflow-hidden hidden group-hover:block z-50">
                        <a href="#"
                            class="block px-4 py-2 text-xs text-white/70 hover:bg-white/5 hover:text-white transition-colors border-b border-white/5">v1.0</a>
                        <a href="#"
                            class="block px-4 py-2 text-xs text-white/70 hover:bg-white/5 hover:text-white transition-colors">v0.1</a>
                    </div>
                </div>
            </div>
            <div class="text-white opacity-40 hover:opacity-100 transition-opacity">
                <!-- Github Icon -->
                <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path
                        d="M12 0C5.37 0 0 5.37 0 12C0 17.31 3.435 21.795 8.205 23.385C8.805 23.49 9.03 23.13 9.03 22.815C9.03 22.53 9.015 21.585 9.015 20.58C6 21.135 5.22 19.845 4.98 19.17C4.845 18.825 4.26 17.76 3.75 17.475C3.33 17.25 2.73 16.695 3.735 16.68C4.68 16.665 5.355 17.55 5.58 17.91C6.66 19.725 8.385 19.215 9.075 18.9C9.18 18.12 9.495 17.595 9.84 17.295C7.17 16.995 4.38 15.96 4.38 11.37C4.38 10.065 4.845 8.985 5.61 8.145C5.49 7.845 5.07 6.615 5.73 4.965C5.73 4.965 6.735 4.65 9.03 6.195C9.99 5.925 11.01 5.79 12.03 5.79C13.05 5.79 14.07 5.925 15.03 6.195C17.325 4.635 18.33 4.965 18.33 4.965C18.99 6.615 18.57 7.845 18.45 8.145C19.215 8.985 19.68 10.05 19.68 11.37C19.68 15.975 16.875 16.995 14.205 17.295C14.64 17.67 15.015 18.39 15.015 19.515C15.015 21.12 15 22.41 15 22.815C15 23.13 15.225 23.505 15.825 23.385C18.2072 22.5808 20.2773 21.0498 21.7438 19.0074C23.2103 16.9651 23.9994 14.5143 24 12C24 5.37 18.63 0 12 0Z" />
                </svg>
            </div>
        </header>

        <section class="hero-blueprint">
            <h1 id="hero-title"
                class="text-[clamp(2rem,4vw,3rem)] font-bold leading-[1.1] tracking-tight max-w-4xl opacity-0">
                Completely styled, fully accessible UI components, designed to integrate to HTML derectly for Developers
                with YakaUI Framework.
            </h1>
        </section>

        <!-- Rounded Main Content Panel -->
        <main class="content-panel">
            <div class="max-w-7xl mx-auto px-10 pt-16 w-full flex-1">
                <!-- Library Selectors -->
                <div class="flex items-center p-1 bg-black/40 border border-white/10 rounded-full mb-16 backdrop-blur-xl w-fit">
                    <button class="px-8 py-2 rounded-full text-[11px] font-bold tracking-widest uppercase bg-white/10 text-white shadow-xl border border-white/10 transition-all hover:bg-white/15">React</button>
                    <button class="px-8 py-2 rounded-full text-[11px] font-bold tracking-widest uppercase text-white/30 hover:text-white transition-all">Vue</button>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-8 gap-y-20 py-10">
                    <!-- COMPONENT_GRID_PLACEHOLDER -->
                </div>
            </div>

            <footer class="border-t border-white/5 bg-black/20 backdrop-blur-sm mt-auto relative z-10">
                <div class="max-w-7xl mx-auto px-10 pt-16 pb-12">
                    <div class="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                        <div class="col-span-1 md:col-span-1">
                            <div class="flex items-center gap-2 mb-4">
                                <img src="/image.png" alt="Logo" class="h-6 w-6 opacity-80">
                                <span class="text-sm font-bold tracking-tight uppercase text-white/90">YakaUI</span>
                            </div>
                            <p class="text-xs text-white/40 leading-relaxed max-w-xs">
                                Completely unstyled, fully accessible UI components, designed to integrate beautifully
                                with Tailwind CSS.
                            </p>
                        </div>

                        <div><h3 class="text-[10px] font-bold text-white/90 tracking-widest uppercase mb-6">Resources</h3><ul class="space-y-4 text-xs text-white/40 font-medium"><li><a href="#" class="hover:text-cyan-400 transition-colors duration-300">Documentation</a></li><li><a href="#" class="hover:text-cyan-400 transition-colors duration-300">Components</a></li><li><a href="#" class="hover:text-cyan-400 transition-colors duration-300">Marketplace</a></li></ul></div>
                        <div><h3 class="text-[10px] font-bold text-white/90 tracking-widest uppercase mb-6">Connect</h3><ul class="space-y-4 text-xs text-white/40 font-medium"><li><a href="#" class="hover:text-cyan-400 transition-colors duration-300">GitHub</a></li><li><a href="#" class="hover:text-cyan-400 transition-colors duration-300">Discord</a></li><li><a href="#" class="hover:text-cyan-400 transition-colors duration-300">Twitter</a></li></ul></div>
                        <div><h3 class="text-[10px] font-bold text-white/90 tracking-widest uppercase mb-6">Legal</h3><ul class="space-y-4 text-xs text-white/40 font-medium"><li><a href="#" class="hover:text-cyan-400 transition-colors duration-300">Privacy</a></li><li><a href="#" class="hover:text-cyan-400 transition-colors duration-300">Terms</a></li></ul></div>
                    </div>

                    <div class="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between text-[10px] text-white/20 font-mono uppercase tracking-wider"><p>&copy; 2026 YakaUI Labs Inc.</p><p>v1.0 </p></div>
                </div>
            </footer>
        </main>
    </div>

    <!-- Reveal Logic -->
    <script>
        window.addEventListener('load', () => {
            gsap.to("#hero-title", {
                opacity: 1,
                y: -15,
                duration: 1.8,
                ease: "expo.out"
            });
        });
    </script>
</body>

</html>"""

# Components to generate
components = [
    ("Buttons", "one.html"), ("Checkbox", "one.html"), ("Combobox", "one.html"), 
    ("Dialog", "one.html"), ("Disclosure", "index.html"), ("Dropdown", "one.html"), 
    ("Fieldset", "one.html"), ("Input", "one.html"), ("Listbox", "one.html"), 
    ("Popover", "one.html"), ("Radio Group", "one.html"), ("Select", "one.html"), 
    ("Tabs", "one.html"), ("Textarea", "one.html"), ("Transistion", "one.html")
]

footer_pattern = re.compile(r'<footer.*?>.*?</footer>', re.DOTALL)
attr_pattern = re.compile(r'<div[^>]*?>.*?Created by.*?</div>|<a[^>]*?>.*?Jinuk.*?</a>', re.DOTALL | re.IGNORECASE)

grid_items_html = ""
for name, filename in components:
    comp_path = os.path.join(base_path, name, filename)
    try:
        with open(comp_path, 'r', encoding='utf-8') as f:
            comp_html = f.read()
            
        comp_html = attr_pattern.sub("", footer_pattern.sub("", comp_html))
        
        # Isolation fixes
        for bg in ['#030303', '#000', '#0a0a0a', '#020202', '#050505']:
            comp_html = comp_html.replace(f'background-color: {bg};', 'background-color: transparent;')
            comp_html = comp_html.replace(f'background: {bg};', 'background: transparent;')
        
        # Scale handling
        iframe_scale = "scale-75"
        iframe_wh = "w-[133.33%] h-[133.33%]"
        if name == "Fieldset":
            iframe_scale = "scale-[0.55]" # Even smaller
            iframe_wh = "w-[181.81%] h-[181.81%]"

        escaped_html = html.escape(comp_html)
        
        item_html = f"""
                    <div class="flex flex-col gap-5">
                        <div class="flex items-center justify-between px-1">
                            <span class="text-[11px] font-bold text-white/90 uppercase tracking-[0.2em]">{name}</span>
                            <a href="{name}/{filename}" target="_blank" class="text-[9px] font-bold text-white/20 hover:text-cyan-400 transition-colors uppercase tracking-widest flex items-center gap-1.5 focus:outline-none">
                                showcase <i class="fa-solid fa-arrow-up-right-from-square text-[8px] opacity-40"></i>
                            </a>
                        </div>
                        <div class="group relative h-[380px] bg-[#020202] border border-white/5 rounded-2xl overflow-hidden shadow-2xl transition-all duration-700 hover:border-white/20 hover:bg-[#030303]">
                            <div class="w-full h-full flex items-center justify-center p-8">
                                <iframe 
                                    srcdoc="{escaped_html}" 
                                    class="{iframe_wh} border-0 origin-center {iframe_scale} opacity-90 group-hover:opacity-100 transition-opacity duration-700" 
                                    scrolling="no" 
                                    sandbox="allow-scripts allow-forms allow-same-origin allow-popups allow-modals">
                                </iframe>
                                <div class="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-700 pointer-events-none"></div>
                            </div>
                            <div class="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        </div>
                    </div>"""
        grid_items_html += item_html
    except:
        print(f"Skipping {name}")

# Perform the single replacement in the base template
final_html = base_template.replace("<!-- COMPONENT_GRID_PLACEHOLDER -->", grid_items_html)

with open(index_path, 'w', encoding='utf-8') as f:
    f.write(final_html)

print("Fresh index regenerated. No duplicates. Labels above cards. Darker everything.")
