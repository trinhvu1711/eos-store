import clsx from "clsx";

const Price = ({
  amount = "0",
  className,
  currencyCode,
  currencyCodeClassName,
}: {
  amount: string;
  className?: string;
  currencyCode?: string;
  currencyCodeClassName?: string;
} & React.ComponentProps<"p">) => {
  // Add a check to ensure that currencyCode is not empty or invalid
  if (!currencyCode || !Intl.NumberFormat.supportedLocalesOf([currencyCode])[0])
    return (
      <p suppressHydrationWarning={true} className={className}>
        {amount}
        <span className={clsx("ml-1 inline", currencyCodeClassName)}>
          {`${currencyCode}`}
        </span>
      </p>
    );
};

export default Price;
