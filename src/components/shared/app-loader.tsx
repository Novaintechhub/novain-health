
import Image from 'next/image';

export default function AppLoader() {
  return (
    <div className="flex items-center justify-center h-screen w-screen bg-background">
      <div className="animate-pulse">
        <Image src="/logo.png" alt="NovainHealth Logo" width={186} height={51} />
      </div>
    </div>
  );
}
