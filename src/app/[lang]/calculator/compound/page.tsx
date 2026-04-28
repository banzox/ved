import { getDictionary, Locale } from "@/i18n/getDictionary";
import CompoundCalculator from "@/components/CompoundCalculator";

export default async function CompoundCalculatorPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const dict = await getDictionary(lang as Locale);

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">{dict.calculators.compound_title}</h1>
        <p className="text-zinc-400 max-w-2xl">{dict.calculators.compound_desc}</p>
      </div>

      <CompoundCalculator dict={dict} />
    </div>
  );
}
