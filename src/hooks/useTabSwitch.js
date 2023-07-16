import { useState, useEffect } from "react";

const useTabSwitch = (tabs, defaultTab) => {
	const [currentTab, setCurrentTab] = useState(defaultTab); 

	useEffect(() => {
		setCurrentTab(defaultTab)
	}, [defaultTab])

	const handleSwitchTab = (tab) =>{
		setCurrentTab(tab);
	}

	return [currentTab, handleSwitchTab]
}

export default useTabSwitch;