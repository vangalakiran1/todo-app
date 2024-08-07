export default function scrollDown() {
  const appPage = document.querySelector("#root");
  return (appPage.scrollTop = appPage.scrollHeight);
}
