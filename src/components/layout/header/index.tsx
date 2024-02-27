import { HeaderStyles } from "./HeaderStyles"
import { useRouter } from 'next/router';
import Link from 'next/link';

const items = [
  {
    name: 'Hoy',
    slug: '/'
  },
  {
    name: 'Calendario',
    slug: '/calendario'
  },  
];

export const Header = () => {
  const router = useRouter();

  console.log(router.pathname)

  return (
    <HeaderStyles>
      <div className="header-wrapper">
          {items.map((item) => (
            <div 
              key={item.slug} 
              className="item"
            >
              <Link 
                href={item.slug}
                className={router.pathname === item.slug ? 'active' : 'item'}  
              >
                {item.name}
              </Link>
            </div>
          ))}
      </div>
    </HeaderStyles>
  );
};
