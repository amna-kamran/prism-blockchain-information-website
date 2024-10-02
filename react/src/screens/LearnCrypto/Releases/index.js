import React from "react";
import cn from "classnames";
import styles from "./Releases.module.sass";
import Item from "./Item";

const items = [
  {
    title: "A Beginner's Guide to TradingView",
    currency: "Ethereum",
    content:
      "A fully-featured landing page kit, including design files, and beautiful 3D illustrations editable.",
    category: "red",
    categoryText: "new",
    image: "/images/content/releases-pic-1.jpg",
    image2x: "/images/content/releases-pic-1@2x.jpg",
    url: "/learn-crypto-details",
  },
  {
    title: "What Is Crypto Market Sentiment?",
    currency: "Ethereum",
    content:
      "A fully-featured landing page kit, including design files, and beautiful 3D illustrations editable.",
    category: "green",
    categoryText: "beginner",
    image: "/images/content/releases-pic-2.jpg",
    image2x: "/images/content/releases-pic-2@2x.jpg",
    url: "/learn-crypto-details",
  },
  {
    title: "What Is the Ethereum Hard Fork?",
    currency: "Ethereum",
    content:
      "A fully-featured landing page kit, including design files, and beautiful 3D illustrations editable.",
    category: "red",
    categoryText: "new",
    image: "/images/content/releases-pic-3.jpg",
    image2x: "/images/content/releases-pic-3@2x.jpg",
    url: "/learn-crypto-details",
  },
];

const Releases = ({ scrollToRef }) => {
  return (
    <div
      className={cn("section-bg section-mb0", styles.releases)}
      ref={scrollToRef}
    >
      <div className={cn("container", styles.container)}>
        <div className={styles.list}>
          {items.map((x, index) => (
            <Item className={styles.item} item={x} key={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Releases;
