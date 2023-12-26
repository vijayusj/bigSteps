'use client';
import '@/styles/PokemonModal.scss';
import PokemonDetails from '@/components/PokemonDetails';
import { Suspense } from 'react';
import { useRouter } from 'next/navigation';
import Loading from '@/components/Loading';
const PokemonModalPage = ({ params: { id } }) => {
  const router = useRouter();

  return (
    <>
      {
        <div className="modal_container">
          <div className="modal">
            <Suspense fallback={<Loading />}>
              <PokemonDetails id={id} />
            </Suspense>
            <div
              className="close"
              onClick={(e) => {
                e.preventDefault();
                router.back();
              }}
            >
              ❌
            </div>
          </div>
        </div>
      }
    </>
  );
};

export default PokemonModalPage;
