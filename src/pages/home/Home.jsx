//styles
import styles from './Home.module.scss'
//compoments
import Hero from './blocks/hero/Hero'
import QuickCategory from './blocks/quickCategory/QuickCategory'
import FeaturedEvents from './blocks/featuredEvents/FeaturedEvents'
export default function Home() {
  return (
    <main>
      <Hero />
      <QuickCategory /> <FeaturedEvents />
    </main>
  )
}
