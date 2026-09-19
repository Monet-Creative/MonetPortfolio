import logo from "../assets/monet-logo.png"

type LogoProps = {
  size?: "sm" | "lg"
}

export default function Logo({ size = "sm" }: LogoProps) {
  return (
    <img
      src={logo}
      alt="Monet"
      className={size === "lg" ? "h-9 w-auto md:h-12" : "h-4 w-auto"}
    />
  )
}
