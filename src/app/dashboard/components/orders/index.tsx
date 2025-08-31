"use client";

import { RefreshCcw } from "lucide-react";
import styles from "./styles.module.scss";
import { OrderPropos } from "@/lib/order.type";
import { ModalOrder } from "../modal";
import { useContext } from "react";
import { OrderContext } from "@/providers/order";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface Props {
  order: OrderPropos[];
}

export function Orders({ order }: Props) {
  const { isOpen, onRequestOpen } = useContext(OrderContext);
  const router = useRouter();

  async function handleDetailOrder(order_id: string) {
    onRequestOpen(order_id);
  }

  function handleRefresh() {
    router.refresh();
    toast.success("Página atualizada com sucesso!");
  }

  return (
    <>
      <main className={styles.container}>
        <section className={styles.containerHeader}>
          <h1>Últimos pedidos</h1>
          <button onClick={handleRefresh}>
            <RefreshCcw size={24} color="#3fffa3" />
          </button>
        </section>

        <section className={styles.listOrders}>
          {order.length === 0 && (
            <span className={styles.emptyItem}>Nenhum pedido encontrado</span>
          )}

          {order.map((order) => (
            <button
              key={order.id}
              className={styles.orderItem}
              onClick={() => handleDetailOrder(order.id)}
            >
              <div className={styles.tag}></div>
              <span>Mesa {order.table}</span>
            </button>
          ))}
        </section>
      </main>

      {isOpen && <ModalOrder />}
    </>
  );
}