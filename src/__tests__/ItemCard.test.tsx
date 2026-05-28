import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import ItemCard from "@/components/ItemCard";
import favoritesReducer from "@/store/favoritesSlice";
import { items } from "@/data/items";

const mockItem = items[0];

const createStore = () =>
  configureStore({
    reducer: { favorites: favoritesReducer },
  });

const renderWithStore = (component: React.ReactElement) => {
  const store = createStore();
  return render(<Provider store={store}>{component}</Provider>);
};

describe("ItemCard", () => {
  it("renders item title", () => {
    renderWithStore(<ItemCard item={mockItem} />);
    expect(screen.getByText(mockItem.title)).toBeInTheDocument();
  });

  it("renders item price", () => {
    renderWithStore(<ItemCard item={mockItem} />);
    expect(screen.getByText(`€${mockItem.price}`)).toBeInTheDocument();
  });

  it("renders item brand", () => {
    renderWithStore(<ItemCard item={mockItem} />);
    expect(screen.getByText(mockItem.brand)).toBeInTheDocument();
  });

  it("toggles favorite on heart click", () => {
    const store = createStore();
    render(
      <Provider store={store}>
        <ItemCard item={mockItem} />
      </Provider>,
    );
    const heartButton = screen.getByRole("button");
    fireEvent.click(heartButton);
    expect(store.getState().favorites.ids).toContain(mockItem.id);
  });

  it("removes favorite on second heart click", () => {
    const store = createStore();
    render(
      <Provider store={store}>
        <ItemCard item={mockItem} />
      </Provider>,
    );
    const heartButton = screen.getByRole("button");
    fireEvent.click(heartButton);
    fireEvent.click(heartButton);
    expect(store.getState().favorites.ids).not.toContain(mockItem.id);
  });
});
