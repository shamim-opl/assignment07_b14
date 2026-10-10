export default function Footer() {
  return (
    <footer className="mt-12 border-t border-base-300 bg-base-100">
      <div className="container-x flex flex-col gap-2 py-6 text-sm text-ink/70 md:flex-row md:items-center md:justify-between">
        <p>বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে।</p>
        <p className="md:text-right">
          সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।
        </p>
      </div>
    </footer>
  );
}
