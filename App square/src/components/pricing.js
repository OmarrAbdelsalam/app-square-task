import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';

const Pricing = () => {
  const t = useTranslations('Pricing'); 

  const plans = [
    {
      name: t('professionalPlanName'),
      price: t('professionalPlanPrice'),
      duration: t('yearly'),
      users: t('advancedCustomization'),
      storage: t('unlimitedStorage'),
      emailSupport: t('support24_7'),
      helpCenter: t('helpCenterAccess'),
      phoneSupport: t('websiteStats'),
      communityAccess: t('communityAccess'),
      buttonColor: "bg-main text-white hover:bg-main/90",
      borderColor: "border-main",
      svgColor: "text-[rgb(210,46,31)]",
      buttonText: t('tryFreeForMonth'),
    },
    {
      name: t('customPlanName'),
      price: t('customPlanPrice'),
      duration: t('oneTime'),
      users: t('includedUsers'),
      storage: t('unlimitedStorage'),
      emailSupport: t('support24_7'),
      helpCenter: t('helpCenterAccess'),
      buttonColor: "bg-white text-main hover:ring-main",
      borderColor: "border-main",
      svgColor: "text-[rgb(210,46,31)]",
      buttonText: t('contactUs'),
    },
  ];

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:items-center md:gap-8">
        {plans.map((plan, index) => (
          <div
            key={index}
            className={`rounded-2xl border ${plan.borderColor} p-6 shadow-sm sm:px-8 lg:p-12`}
          >
            <div className="text-center">
              <h2 className="text-lg font-medium text-gray-900">
                {plan.name}
                <span className="sr-only">{t('plan')}</span>
              </h2>

              <p className="mt-2 sm:mt-4">
                <strong className="text-3xl font-bold text-gray-900 sm:text-4xl">
                  {plan.price}
                </strong>
                <span className="text-sm font-medium text-gray-700">{plan.duration}</span>
              </p>
            </div>

            <ul className="mt-6 space-y-2">
              {[plan.users, plan.storage, plan.emailSupport, plan.helpCenter, plan.phoneSupport, plan.communityAccess]
                .filter(Boolean)
                .map((feature, i) => (
                  <li key={i} className="flex items-center gap-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className={`size-5 ${plan.svgColor}`}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4.5 12.75l6 6 9-13.5"
                      />
                    </svg>
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
            </ul>

            <Link
              href="/login"
              className={`mt-8 block rounded-full border ${plan.borderColor} ${plan.buttonColor} px-12 py-3 text-center text-sm font-medium hover:ring-1 focus:outline-none focus:ring active:text-main/90`}
            >
              {plan.buttonText}
              </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Pricing;
