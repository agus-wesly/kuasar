type Props = {}

export default function Footer({}: Props) {
  return (
    <footer className="bg-[#753d94] px-4 py-2 text-white text-xs md:text-sm md:px-8 md:py-4 flex flex-col md:flex-row md:justify-between md:items-center gap-4">
      <p className="leading-relaxed max-w-56">
        Infiniti Office, Menara Cakrawala 12thFloor Unit 1205A, Jl. M.H Thamrin,
        Menteng Jakarta Pusat 10340
      </p>
      <p className="font-bold lg:text-base">
        © Kuasar.id {new Date().getFullYear()}
      </p>
    </footer>
  )
}
