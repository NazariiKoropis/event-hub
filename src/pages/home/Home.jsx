//styles
import styles from './Home.module.scss'
//compoments
import Container from '../../components/layout/container/Container'
import QuickCategory from './blocks/quickCategory/QuickCategory'
import Hero from './blocks/hero/Hero'

export default function Home() {
  return (
    <main>
      <Hero />
      <QuickCategory />{' '}
    </main>
  )
}
