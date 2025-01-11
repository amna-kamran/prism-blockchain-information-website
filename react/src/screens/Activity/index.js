import React, { useState, useEffect } from "react";
import cn from "classnames";
import styles from "./Activity.module.sass";
import Icon from "../../components/Icon";
import Actions from "../../components/Actions";
import Calendar from "../../components/Calendar";
import Export from "../../components/Export";
import Dropdown from "../../components/Dropdown";
import Table from "./Table";
import axios from "axios";

const navigation = ["All Transactions", "All Nodes"];

const Activity = () => {
  const [email, setEmail] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const [sorting, setSorting] = useState(navigation[0]);
  const [nodes, setNodes] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [loadingNodes, setLoadingNodes] = useState(false);
  const [loadingTransactions, setLoadingTransactions] = useState(false);
  const [errorNodes, setErrorNodes] = useState("");
  const [errorTransactions, setErrorTransactions] = useState("");

  // Fetch nodes
  useEffect(() => {
    const fetchNodes = async () => {
      setLoadingNodes(true);
      setErrorNodes("");

      try {
        const response = await axios.get("/api/v1/nodes", {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        });

        if (response.status === 200) {
          setNodes(response.data.nodes || []);
        } else {
          throw new Error("Unexpected server response.");
        }
      } catch (err) {
        if (err.response) {
          setErrorNodes(
            `Failed to fetch nodes. Server error: ${err.response.status}`
          );
        } else if (err.request) {
          setErrorNodes("Failed to fetch nodes. No response from server.");
        } else {
          setErrorNodes(`Failed to fetch nodes. Error: ${err.message}`);
        }
      } finally {
        setLoadingNodes(false);
      }
    };

    fetchNodes();
  }, []);

  useEffect(() => {
    const fetchTransactions = async () => {
      setLoadingTransactions(true);
      setErrorTransactions("");

      try {
        const transactionResponse = await axios.get("/api/v1/rand/node", {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        });

        const nodeIp = transactionResponse.data;

        if (!nodeIp) {
          throw new Error("Node IP address not found.");
        }

        // Use CORS proxy to bypass CORS restrictions
        const corsProxy = "https://cors-anywhere.herokuapp.com/";
        const secondUrl = `${corsProxy}http://${nodeIp}:10111/`;

        const finalResponse = await axios.get(secondUrl);

        // Extract transactions from all blocks in the chain
        const allTransactions = finalResponse.data.chain.flatMap(
          (block) => block.transactions
        );

        setTransactions(allTransactions); // Set the transactions to state

        console.log(allTransactions); // Optional: Log the allTransactions array
      } catch (err) {
        if (err.response) {
          setErrorTransactions(
            `Failed to fetch transactions. Server error: ${err.response.status}`
          );
        } else if (err.request) {
          setErrorTransactions(
            "Failed to fetch transactions. No response from server."
          );
        } else {
          setErrorTransactions(
            `Failed to fetch transactions. Error: ${err.message}`
          );
        }
      } finally {
        setLoadingTransactions(false);
      }
    };

    fetchTransactions();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Searching for ${email}`);
  };

  return (
    <div className={styles.activity}>
      <div className={cn("container", styles.container)}>
        <div className={styles.body}>
          <div className={styles.top}>
            <div className={styles.nav}>
              {navigation.map((x, index) => (
                <button
                  className={cn(styles.link, {
                    [styles.active]: index === activeIndex,
                  })}
                  onClick={() => setActiveIndex(index)}
                  key={index}
                >
                  {x}
                </button>
              ))}
            </div>
            <div className={styles.dropdown}>
              <Dropdown
                className={styles.dropdown}
                classDropdownHead={styles.dropdownHead}
                value={sorting}
                setValue={setSorting}
                options={navigation}
              />
            </div>
            <form className={styles.form} onSubmit={handleSubmit}>
              <input
                className={styles.input}
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                name="search"
                placeholder="Search"
                required
              />
              <button className={styles.result}>
                <Icon name="search" size="20" />
              </button>
            </form>
            <Calendar className={styles.calendar} />
          </div>
          <div className={styles.line}>
            <h4 className={cn("h4", styles.title)}>
              {activeIndex === 1 ? "Nodes" : "Transactions"}
            </h4>
            <Export className={styles.export} />
          </div>

          {/* Display Table or Nodes */}
          <div className={styles.table}>
            {activeIndex === 1 ? (
              loadingNodes ? (
                <p>Loading nodes...</p>
              ) : errorNodes ? (
                <p className={styles.error}>{errorNodes}</p>
              ) : (
                <ul className={styles.nodeList}>
                  {nodes.map((node, index) => (
                    <li key={index} className={styles.nodeItem}>
                      {node}
                    </li>
                  ))}
                </ul>
              )
            ) : loadingTransactions ? (
              <p>Loading transactions...</p>
            ) : errorTransactions ? (
              <p className={styles.error}>{errorTransactions}</p>
            ) : (
              <Table className={styles.table} items={transactions} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Activity;
