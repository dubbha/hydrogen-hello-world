import {
  Link,
  useLocation,
  useSearchParams,
  useNavigation,
} from '@remix-run/react';
import type {
  ProductOption,
  ProductVariant,
} from '@shopify/hydrogen-react/storefront-api-types';

type ProductOptionsProps = {
  options: ProductOption[];
  selectedVariant: ProductVariant;
};

export default function ProductOptions({
  options,
  selectedVariant,
}: ProductOptionsProps) {
  // pathname and search will be used to build option URLs
  const {pathname} = useLocation();
  const [currentSearchParams] = useSearchParams();
  const navigation = useNavigation();

  const paramsWithDefaults = () => {
    const defaultParams = new URLSearchParams(currentSearchParams);
    if (!selectedVariant) return defaultParams;

    selectedVariant.selectedOptions.forEach(({name, value}) => {
      if (!currentSearchParams.has(name)) {
        defaultParams.set(name, value);
      }
    });
    return defaultParams;
  };

  const searchParams = navigation.location
    ? new URLSearchParams(navigation.location.search)
    : paramsWithDefaults();

  return (
    <div className="grid gap-4 mb-6">
      {/* Each option will show a label and option value <Links> */}
      {options.map((option) => {
        if (!option.values.length) {
          return;
        }

        // get the currently selected option value
        const currentOptionVal = searchParams.get(option.name);
        return (
          <div
            key={option.name}
            className="flex flex-col flex-wrap mb-4 gap-y-2 last:mb-0"
          >
            <h3 className="whitespace-pre-wrap max-w-prose font-bold text-lead min-w-[4rem]">
              {option.name}
            </h3>

            <div className="flex flex-wrap items-baseline gap-4">
              {option.values.map((value) => {
                const linkParams = new URLSearchParams(searchParams);
                const isSelected = currentOptionVal === value;
                linkParams.set(option.name, value);
                return (
                  <Link
                    key={value}
                    to={`${pathname}?${linkParams.toString()}`}
                    preventScrollReset
                    replace
                    className={`leading-none py-1 border-b-[1.5px] cursor-pointer transition-all duration-200 ${
                      isSelected ? 'border-gray-500' : 'border-neutral-50'
                    }`}
                  >
                    {value}
                  </Link>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
