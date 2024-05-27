import Link from "next/link";

export const CustomToastWithLink = ({
  message,
  linkText,
  linkUrl,
}: {
  message: String;
  linkText: String;
  linkUrl: any;
}) => {
  return (
    <div className="flex justify-between items-center">
      <p>{message}</p>
      <Link
        href={linkUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="text-green-700"
      >
        {linkText}
      </Link>
    </div>
  );
};
