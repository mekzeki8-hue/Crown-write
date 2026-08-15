export default function Logo({ size = 32, light = false }: { size?: number; light?: boolean }) {
  return (
    <div style={{
      width: size,
      height: size,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img 
        src="/logo.png" 
        alt="CrownWrite" 
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'contain',
        }}
      />
    </div>
  );
}
