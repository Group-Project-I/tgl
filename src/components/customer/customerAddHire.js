import React from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import AddHireImport from './addHireImport'
import AddHireExports from './addHireExport'



class CustomerAddHire extends React.Component{
   
    render(){
        return(
            <div>
                <div id="content" className="container" role="main">
                <br/><br/><br/><br/>
                <Tabs className="center">
                    <TabList>
                        <Tab>IMPORTS</Tab>
                        <Tab>EXPORTS</Tab>
                    </TabList>
                    <TabPanel>
                        <AddHireImport />
                    </TabPanel>
                    <TabPanel>
                        <AddHireExports />
                    </TabPanel>
                </Tabs>
            </div>
            </div>
        )
    }
}
export default CustomerAddHire; 
