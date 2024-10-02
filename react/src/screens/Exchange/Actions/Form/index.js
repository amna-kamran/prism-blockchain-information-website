import React from "react";
import cn from "classnames";
import styles from "./Form.module.sass";
import Action from "./Action";
import { useMediaQuery } from "react-responsive";
import Icon from "../../../../components/Icon";

const Form = ({
  contentBuy,
  contentSell,
  price,
  stop,
  limit,
  visible,
  setValue,
}) => {
  const isTablet = useMediaQuery({ query: "(max-width: 1023px)" });

  return (
    <div className={styles.form}>
      {isTablet ? (
        <>
          {visible ? (
            <>
              <div className={styles.head}>
                <div className={styles.title}>Place order</div>
                <button
                  className={styles.close}
                  onClick={() => setValue(false)}
                >
                  <Icon name="close-circle" size="24" />
                </button>
              </div>
              <Action
                title="Buy PRISM"
                content={contentBuy}
                price={price}
                stop={stop}
                limit={limit}
                classButton="button-green"
                buttonText="Buy PRISM"
              />
            </>
          ) : (
            <>
              <div className={styles.head}>
                <div className={styles.title}>Place order</div>
                <button
                  className={styles.close}
                  onClick={() => setValue(false)}
                >
                  <Icon name="close-circle" size="24" />
                </button>
              </div>
              <Action
                title="Sell PRISM"
                content={contentSell}
                price={price}
                stop={stop}
                limit={limit}
                classButton="button-red"
                buttonText="Sell PRISM"
              />
            </>
          )}
        </>
      ) : (
        <div className={styles.row}>
          <div className={styles.col}>
            <Action
              title="Buy PRISM"
              content={contentBuy}
              price={price}
              stop={stop}
              limit={limit}
              classButton="button-green"
              buttonText="Buy PRISM"
            />
          </div>
          <div className={styles.col}>
            <Action
              title="Sell PRISM"
              content={contentSell}
              price={price}
              stop={stop}
              limit={limit}
              classButton="button-red"
              buttonText="Sell PRISM"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Form;
