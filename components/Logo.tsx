import Image from 'next/image';

export default function Logo() {
    return (
        <div className="text-center mb-8">
            <div className="relative inline-block">
                {/* Logo del restaurante */}
                <div className="flex justify-center items-center">
                    <Image
                        src="/images/Logos/Logo.png"
                        alt="Ribello Restaurant Logo"
                        width={350}
                        height={250}
                        className="object-contain"
                        priority
                    />
                </div>
            </div>
        </div>
    );
}
