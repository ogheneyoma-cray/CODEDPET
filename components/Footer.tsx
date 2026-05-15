import Link from "next/link";

export default function Footer() {
  return (
    <footer className="py-8 px-8 border-t border-white/10 mt-12 bg-slate-900/20">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-sm text-slate-400">
          &copy; {new Date().getFullYear()} Codedpet. All rights reserved.
        </div>
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
          <Link href="/privacy" className="text-sm text-slate-400 hover:text-[#00C853] transition-colors">Privacy Policy</Link>
          <Link href="/terms" className="text-sm text-slate-400 hover:text-[#00C853] transition-colors">Terms</Link>
          <Link href="/refund" className="text-sm text-slate-400 hover:text-[#00C853] transition-colors">Refund Policy</Link>
          <Link href="/shipping" className="text-sm text-slate-400 hover:text-[#00C853] transition-colors">Shipping</Link>
          <Link href="/contact" className="text-sm text-slate-400 hover:text-[#00C853] transition-colors">Contact</Link>
        </div>
      </div>
    </footer>
  );
}
