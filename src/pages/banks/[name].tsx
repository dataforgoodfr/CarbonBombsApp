import { useRouter } from 'next/router';
import Link from 'next/link';

export default function Bank() {
  const router = useRouter();
  const { name } = router.query;

  return (
    <div className='py-12'>
      <Link className='mb-8 block text-xl text-blue-400' href='/companies'>
        ⬅ Back
      </Link>
      <h1>Bank Detail for: {name}</h1>
      {/* Your other components and content go here */}
    </div>
  );
}
