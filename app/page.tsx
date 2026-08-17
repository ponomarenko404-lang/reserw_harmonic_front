import About from "@/components/home/About/About";
import Creators from "@/components/home/Creators/Creators";
import Hero from "@/components/home/Hero/Hero";
import PopularArticles from "@/components/home/PopularArticles/PopularArticles";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <section>
        <Hero />
        <About />
        <PopularArticles />
        <Creators />
      </section>
    </div>
  );
}
