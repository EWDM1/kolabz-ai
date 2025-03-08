
import { useLanguage } from "@/components/LanguageContext";

interface BillingToggleProps {
  isAnnual: boolean;
  setIsAnnual: (isAnnual: boolean) => void;
}

const BillingToggle = ({ isAnnual, setIsAnnual }: BillingToggleProps) => {
  const { t } = useLanguage();
  
  return (
    <div className="flex items-center justify-start space-x-4 mb-8">
      <span className={`text-sm ${!isAnnual ? "text-foreground font-medium" : "text-muted-foreground"}`}>
        {t("pricing.toggle.monthly", "Monthly")}
      </span>
      <button
        onClick={() => setIsAnnual(!isAnnual)}
        className="relative inline-flex h-6 w-12 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary/20 focus:ring-offset-2 bg-muted"
      >
        <span
          className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-background shadow ring-0 transition duration-200 ease-in-out ${
            isAnnual ? "translate-x-6" : "translate-x-0"
          }`}
        />
      </button>
      <span className={`text-sm ${isAnnual ? "text-foreground font-medium" : "text-muted-foreground"}`}>
        {t("pricing.toggle.annual", "Annual")} <span className="text-primary font-medium">{t("pricing.save", "Save 16%")}</span>
      </span>
    </div>
  );
};

export default BillingToggle;
