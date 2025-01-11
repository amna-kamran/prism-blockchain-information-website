import React from "react";
import cn from "classnames";
import styles from "./Table.module.sass";
import { Link } from "react-router-dom";

const Table = ({ className, items }) => {
  return (
    <div className={cn(className, styles.table)}>
      <div className={styles.row}>
        <div className={styles.col}>
          <div className="sorting">Coin</div>
        </div>
        <div className={styles.col}>
          <div className="sorting">Value</div>
        </div>
        <div className={styles.col}>
          <div className="sorting">Sender Address</div>
        </div>
        <div className={styles.col}>
          <div className="sorting">Receiver Address</div>
        </div>
        {/* <div className={styles.col}>Timestamp</div> */}
      </div>
      {items.map((x, index) => (
        <Link className={styles.row} key={index} to={x.url}>
          <div className={styles.col}>
            <div className={styles.item}>
              <div className={styles.icon}>
                <img src="/images/logo.svg" alt="Coin" />
              </div>
              <div className={styles.currency}>{x.currency}</div>
            </div>
          </div>
          <div className={styles.col}>
            <div className={styles.label}>value</div>
            {x.value}
          </div>
          <div className={styles.col}>
            <div className={styles.label}>Sender Address</div>
            {x.senderChainAddress}
          </div>
          <div className={styles.col}>
            <div className={styles.label}>Receiver Address</div>
            {x.recipientChainAddress}
          </div>
          {/* <div className={styles.col}>
            <div className={styles.label}>Timestamp</div>
            {x.timestamp}
          </div> */}
        </Link>
      ))}
    </div>
  );
};

export default Table;
