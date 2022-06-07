import { LoadingDots } from '@/components/icons';

export default function ClusterProvisioning() {
  return (
    <div className="h-screen w-screen flex flex-col space-y-3 justify-center items-center bg-black">
      <h1 className="text-white">Provisioning database</h1>
      <LoadingDots color="white" />
    </div>
  );
}
