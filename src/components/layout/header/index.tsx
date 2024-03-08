import { HeaderStyles } from "./HeaderStyles"
import { useRouter } from "next/router"
import Link from "next/link"
import Image from "next/image"

const items = [
  {
    name: "Hoy",
    slug: "/",
  },
  {
    name: "Calendario",
    slug: "/calendario",
  },
]

export const Header = () => {
  const router = useRouter()

  return (
    <HeaderStyles>
      <div className="header-wrapper">
        <div className="controls">
          {items.map((item) => (
            <div key={item.slug} className="item">
              <Link
                href={item.slug}
                className={router.pathname === item.slug ? "active" : "item"}
              >
                {item.name}
              </Link>
            </div>
          ))}
        </div>
        <div className="logo">
          <Link href="https://www.semanadeldiseno.cr/">
            <Image
              src="/user-default.png"
              width="30"
              height="30"
              alt="Logo"
            />
          </Link>
        </div>
      </div>
    </HeaderStyles>
  )
}
