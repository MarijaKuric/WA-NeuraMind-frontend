<template>
  <div class="min-h-screen bg-gray-100 flex justify-center p-4">
    <div class="bg-white w-full max-w-4xl rounded-3xl shadow-2xl p-6 md:p-8 flex flex-col h-[90vh]">

      <div class="flex justify-center items-center mb-6">
        <h1 class="text-4xl font-extrabold italic text-blue-500 tracking-tight">NEURAMind</h1>
        <div class="ml-3 w-10 h-10 relative animate-pulse">
          <div class="w-3 h-3 bg-yellow-300 rounded-full absolute top-0 left-2"></div>
          <div class="w-3 h-3 bg-pink-300 rounded-full absolute top-2 right-0"></div>
          <div class="w-3 h-3 bg-green-300 rounded-full absolute bottom-0 right-2"></div>
          <div class="w-3 h-3 bg-purple-300 rounded-full absolute top-5 left-0"></div>
        </div>
      </div>

      <div class="flex justify-center gap-2 md:gap-3 mb-8 flex-wrap">
        <button @click="goToLessons" :class="activeTab==='LEKCIJE'?activeBtn:inactiveBtn">LEKCIJE</button>
        <button @click="goToKvizovi" :class="activeTab==='KVIZOVI'?activeBtn:inactiveBtn">KVIZOVI</button>
        <button @click="goToStatistika" :class="activeTab==='STATISTIKA'?activeBtn:inactiveBtn">STATISTIKA</button>
        <button @click="goToZajednica" :class="activeTab==='ZAJEDNICA'?activeBtn:inactiveBtn">ZAJEDNICA</button>
        <button @click="activeTab='AI CHAT'" :class="activeTab==='AI CHAT'?activeBtn:inactiveBtn">AI CHAT</button>
      </div>

      <div class="flex-1 overflow-y-auto p-4 bg-slate-50 rounded-2xl mb-4 space-y-4 border border-gray-100 shadow-inner" ref="chatWindow">
        <div v-for="(msg, index) in messages" :key="index" 
             :class="['flex w-full', msg.role === 'user' ? 'justify-end' : 'justify-start']">
          
          <div :class="['max-w-[85%] md:max-w-[70%] p-4 rounded-2xl text-sm md:text-base leading-relaxed shadow-sm transition-all', 
                        msg.role === 'user' 
                          ? 'bg-blue-600 text-white rounded-br-none' 
                          : 'bg-white text-gray-700 border border-gray-200 rounded-bl-none']">
            <span class="block font-bold text-[10px] uppercase mb-1 opacity-70">
              {{ msg.role === 'user' ? 'Ti' : 'NEURAMind AI' }}
            </span>
            {{ msg.text }}
          </div>
        </div>
        
        <div v-if="loading" class="flex justify-start">
          <div class="bg-white border border-gray-200 p-4 rounded-2xl rounded-bl-none shadow-sm flex gap-1">
            <span class="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></span>
            <span class="w-2 h-2 bg-blue-400 rounded-full animate-bounce [animation-delay:0.2s]"></span>
            <span class="w-2 h-2 bg-blue-400 rounded-full animate-bounce [animation-delay:0.4s]"></span>
          </div>
        </div>
      </div>

      <div class="relative flex items-center gap-2">
        <input v-model="userInput" 
               @keyup.enter="sendMessage" 
               :disabled="loading"
               placeholder="Pitaj me bilo što..." 
               class="flex-1 bg-white border-2 border-gray-100 rounded-2xl px-6 py-4 focus:outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-500/10 transition-all disabled:opacity-50" />
        
        <button @click="sendMessage" 
                :disabled="loading"
                class="bg-blue-600 text-white p-4 rounded-xl hover:bg-blue-700 hover:scale-105 active:scale-95 transition-all shadow-lg shadow-blue-200 disabled:bg-gray-300">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
          </svg>
        </button>
      </div>

      <div class="flex justify-center pt-4">
        <button @click="logout" class="flex items-center text-gray-400 font-bold hover:text-red-400 transition text-xs uppercase tracking-widest">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Odjava
        </button>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, nextTick } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const activeTab = ref('AI CHAT')
const userInput = ref('')
const loading = ref(false)
const chatWindow = ref(null)

const activeBtn = 'bg-blue-500 text-white px-6 py-2 rounded-full shadow-lg font-bold transition-all transform scale-105'
const inactiveBtn = 'bg-pink-400 text-white px-5 py-2 rounded-full shadow-md font-bold opacity-80 hover:opacity-100 transition-all'

const messages = ref([
  { role: 'bot', text: 'Bok! Ja sam tvoj NEURAMind asistent. Spreman sam za učenje, a što tebe zanima?' }
])

// --- GEMINI KONFIGURACIJA ---
const API_KEY = "AIzaSyC4Qz9i0JXM_NjRHgbEYhCzLOumXVKqJHY"; 

const sendMessage = async () => {
  if (!userInput.value.trim() || loading.value) return

  const userText = userInput.value
  messages.value.push({ role: 'user', text: userText })
  userInput.value = ''
  loading.value = true
  
  await scrollToBottom()

  try {
    // Korištenje stabilnije verzije URL-a (v1 umjesto v1beta ako v1beta zeza)
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ 
          parts: [{ 
            text: `Ti si NEURAMind, edukacijski AI asistent. Odgovaraj na hrvatskom jeziku. Budi koristan, kratak i ohrabrujuć. Korisnik pita: ${userText}` 
          }] 
        }]
      })
    })

    const data = await response.json()
    
    if (data.candidates && data.candidates[0].content.parts[0].text) {
      messages.value.push({ role: 'bot', text: data.candidates[0].content.parts[0].text })
    } else {
      throw new Error("Prazan odgovor")
    }
  } catch (error) {
    console.error("Greška:", error)
    messages.value.push({ role: 'bot', text: 'Žao mi je, došlo je do greške u povezivanju. Provjeri internet ili pokušaj poslije.' })
  } finally {
    loading.value = false
    await scrollToBottom()
  }
}

const scrollToBottom = async () => {
  await nextTick()
  if (chatWindow.value) {
    chatWindow.value.scrollTo({
      top: chatWindow.value.scrollHeight,
      behavior: 'smooth'
    })
  }
}

// Navigacija
const goToLessons = () => router.push({ name: 'PrikazLekcija' })
const goToKvizovi = () => router.push({ name: 'KvizoviKorisnik' })
const goToStatistika = () => router.push({ name: 'StatistikaKorisnik' })
const goToZajednica = () => router.push({ name: 'ZajednicaKorisnik' })
const logout = () => router.push('/')
</script>

<style scoped>
.overflow-y-auto::-webkit-scrollbar {
  width: 4px;
}
.overflow-y-auto::-webkit-scrollbar-track {
  background: transparent;
}
.overflow-y-auto::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 10px;
}
</style>