import { cloneElement,  ReactElement, ReactNode, useState } from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      <section>
        <Tabs>
          <Tab label="Item 1">
            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
          </Tab>
          <Tab label="Item 2">
            <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).</p>
          </Tab>
        </Tabs>
      </section>
    </div>
  );
}

type TabsProps = {
  children: ReactElement<TabProps>[] | ReactElement<TabProps>;
}

function Tabs({ children }: TabsProps) {

  const [activeTab, setActiveTab] = useState(0)

  function HandleTab(indexTab: number) {
    setActiveTab(indexTab)
  }

  function CloneTab(tab: ReactElement<TabProps>, indexTab = 0) {
    return (
      cloneElement(tab, {
        onClick: () => HandleTab(indexTab),
        isActive: activeTab === indexTab
      })
    )
  }

  function RenderChildrenTabs() {
    if(!Array.isArray(children)) {
      return CloneTab(children)
    }

    return children.map(CloneTab)
  }

  function RenderActiveTabContent() {
    if(!Array.isArray(children)){
      return children.props.children
    }

    return children[activeTab].props.children
  }

  return (
    <section className="tabs" >
      <nav className="tabs-nav">
        <ul>
          { RenderChildrenTabs() }
        </ul>
      </nav>
      <section className="tabs-content">
        { RenderActiveTabContent() }
      </section>
    </section>
  )
}

type TabProps = {
  children: ReactNode;
  label: string;
  isActive?: boolean;
  onClick?: () => void;
}

function Tab({ children, label, onClick, isActive  }: TabProps) {
  return (
    <li className={`tab ${isActive ? "active": ""}`}>
      <button className="tab-btn" onClick={onClick}>{label}</button>
    </li>
  )
}

export default App;
