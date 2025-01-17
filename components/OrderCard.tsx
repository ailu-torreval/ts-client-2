import { Button, Card, useTheme } from "@rneui/themed";
import { format } from "date-fns";
import { View, Text, SafeAreaView, StyleSheet } from "react-native";
import React from "react";
import { Order } from "../entities/Order";

type Props = {
  order: Order;
  action1: any;
  action2: any;
};

const OrderCard: React.FC<Props> = ({ order, action1, action2 }) => {
  const { theme } = useTheme();

  return (
    <Card key={order.id}>
      <Card.Title>
        Table # {order.table_id} -{" "}
        {order.date ? format(new Date(order.date), "HH:mm") : "N/A"}
      </Card.Title>
      <View>
        {order.products?.map((product) => (
          <View key={product.id}>
            <View style={[styles.grid, styles.margin]}>
              <Text style={{ fontWeight: 600 }}>1 x {product.name}</Text>
              {order.order_status === "pending" && (
                <Text>{product.price} kr.</Text>
              )}
            </View>
            {product.option && (
              <View
                style={[styles.grid, { marginLeft: 20 }]}
                key={product.option.id}
              >
                <Text>{product.option.name}</Text>
                {product.option.price > 0 &&
                  order.order_status === "pending" && (
                    <Text>+ {product.option.price} kr.</Text>
                  )}
              </View>
            )}
            {product.extras && product.extras?.length > 0 && (
              <Text style={{ fontWeight: 500, marginTop: 10 }}>Extras:</Text>
            )}
            {product.extras?.map((extra) => (
              <View style={[styles.grid, { marginLeft: 20 }]} key={extra.id}>
                <Text>{extra.name}</Text>
                {order.order_status === "pending" && (
                  <Text>+ {extra.price} kr.</Text>
                )}
              </View>
            ))}
            {product.note && (
              <Text style={{ marginTop: 7 }}>
                <i>"{product.note}"</i>
              </Text>
            )}
          </View>
        ))}
        {order.order_status === "pending" && (
          <View style={[styles.grid, styles.margin]}>
            <Text style={{ fontWeight: 800 }}>Total</Text>
            <Text style={{ fontWeight: 600 }}>{order.total_amount} kr.</Text>
          </View>
        )}
      </View>
      <View style={[styles.grid, styles.margin]}>
        {order.order_status === "pending" && (
          <>
            <Button style={{ width: 150 }} onPress={action1} size="lg">
              Accept
            </Button>
            <Button
              style={{ width: 150 }}
              onPress={action2}
              size="lg"
              color="#ff0505"
              type="outline"
            >
              Decline
            </Button>
          </>
        )}
        {order.order_status === "accepted" && (
          <Button style={{ width: 350 }} onPress={action1} size="lg">
            Mark as Finished
          </Button>
        )}
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wrapper: {
    // paddingTop: 10,
    paddingLeft: 10,
  },
  text: {
    color: "black",
    fontSize: 20,
  },
  card: {
    backgroundColor: "white",
  },
  subtitle: {
    color: "#303030",
    fontSize: 18,
    paddingVertical: 15,
  },
  title: {
    color: "#45A47D",
    fontWeight: "bold",
    fontSize: 30,
    paddingTop: 30,
    textTransform: "capitalize",
  },
  header: {
    backgroundColor: "#fff",
  },
  grid: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    textTransform: "capitalize",
  },
  margin: {
    marginTop: 17,
  },
});

export default OrderCard;
