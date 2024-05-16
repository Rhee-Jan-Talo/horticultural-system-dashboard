import React from 'react';
import './App.css';
import Nav from './Nav';
import Login from './Login';
import Home from './Home';
import Notfound from './Notfound';
import Employeelist from './Employeelist';
import Employeelistadd from './Employeelistadd';
import Employeelistpositionhistory from './Employeelistpositionhistory';
import Employeelistedit from './Employeelistedit';
import Employeeidpicedit from './Employeeidpicedit';
import Employeejobdescriptionedit from './Employeejobdescriptionedit';
import Employeeprofile from './Employeeprofile';
import Employeeaccounts from './Employeeaccounts';
import Employeeaccountsedit from './Employeeaccountsedit';
import Employeeaccountsadd from './Employeeaccountsadd';
import Employeeaccountsinactive from './Employeeaccountsinactive';
import Plantutilities from './Plantutilities';
import Plantutilitiessoiltype from './Plantutilitiessoiltype';
import Plantutilitiesplantprofile from './Plantutilitiesplantprofile';
import Plantutilitiesplanttype from './Plantutilitiesplanttype';
import Plantutilitiesotherexpense from './Plantutilitiesotherexpense';
import Plantutilitiesunitsofmeasurement from './Plantutilitiesunitsofmeasurement';
import Plantutilitiespaymentmethod from './Plantutilitiespaymentmethod';
import Plantutilitiesitemcategory from './Plantutilitiesitemcategory';
import Farmprofiles from './Farmprofiles';
import Farmprofilesadd from './Farmprofilesadd';
import Farmprofilesedit from './Farmprofilesedit';
import Farmprofilesowner from './Farmprofilesowner';
import Farmprofilesowneradd from './Farmprofilesowneradd';
import Farmprofilesview from './Farmprofilesview';
import Farmprofilesimagemap from './Farmprofilesimagemap';
import Farmprofilesgooglemap from './Farmprofilesgooglemap';
import Farmprofilesorgchart from './Farmprofilesorgchart';
import Farmprofilesareas from './Farmprofilesareas';
import Farmprofilesareasadd from './Farmprofilesareasadd';
import Farmprofilesareasedit from './Farmprofilesareasedit';
import Plantprofiles from './Plantprofiles';
import Plantprofilesadd from './Plantprofilesadd';
import Plantprofilesview from './Plantprofilesview';
import Plantprofilesedit from './Plantprofilesedit';
import Plantprofilesdiseaseadd from './Plantprofilesdiseaseadd';
import Plantprofilesdiseaseedit from './Plantprofilesdiseaseedit';
import Plantprofilespicedit from './Plantprofilespicedit';
import Harvestcalendarlist from './Harvestcalendarlist';
import Harvestcalendarlistinactive from './Harvestcalendarlistinactive';
import Harvestcalendaradd from './Harvestcalendaradd';
import Harvestcalendaredit from './Harvestcalendaredit';
import Harvestcalendar from './Harvestcalendar';
import Harvestcalendarmonitoring from './Harvestcalendarmonitoring';
import Harvestcalendarmonitoringevent from './Harvestcalendarmonitoringevent';
import Harvestcalendarinputmonitoring from './Harvestcalendarinputmonitoring';
import Harvestcalendarinputdiseases from './Harvestcalendarinputdiseases';
import Harvestcalendardiseases from './Harvestcalendardiseases';
import Harvestcalendarupdatediseases from './Harvestcalendarupdatediseases';
import Harvestcalendarinputmortalities from './Harvestcalendarinputmortalities';
import Harvestcalendarinputactivity from './Harvestcalendarinputactivity';
import Harvestinventory from './Harvestinventory';
import Harvestcalendarharvested from './Harvestcalendarharvested';
import Harvestcalendaronsale from './Harvestcalendaronsale';
import Harvestcalendarstockouts from './Harvestcalendarstockouts';
import Harvestinventoryinput from './Harvestinventoryinput';
import Harvestinventoryinputvariations from './Harvestinventoryinputvariations';
import Harvestinventorymedia from './Harvestinventorymedia';
import Harvestinventoryviewvariations from './Harvestinventoryviewvariations';
import Harvestinventoryallvariations from './Harvestinventoryallvariations';
import Harvestcalendarreadyforsale from './Harvestcalendarreadyforsale';
import Iteminventory from './Iteminventory';
import Iteminventoryadd from './Iteminventoryadd';
import Iteminventoryedit from './Iteminventoryedit';
import Iteminventorystockouthistory from './Iteminventorystockouthistory';
import Iteminventorystockinhistoryfull from './Iteminventorystockinhistoryfull';
import Iteminventorystockinhistorypartial from './Iteminventorystockinhistorypartial';
import Purchaseorders from './Purchaseorders';
import Supplierslist from './Supplierslist';
import Suppliersadd from './Suppliersadd';
import Suppliersedit from './Suppliersedit';
import Purchaseorderlist from './Purchaseorderlist';
import Purchaseorderadd from './Purchaseorderadd';
import Purchaseorderlistinfo from './Purchaseorderlistinfo';
import Purchaseorderedit from './Purchaseorderedit';
import Purchaseorderconfirmation from './Purchaseorderconfirmation';
import Purchaseorderconfirmedlist from './Purchaseorderconfirmedlist';
import Purchaseorderconfirmedinfo from './Purchaseorderconfirmedinfo';
import Purchaseorderpayment from './Purchaseorderpayment';
import Purchaseorderhistory from './Purchaseorderhistory';
import Purchaseorderstockin from './Purchaseorderstockin';
import Purchaseorderstockininput from './Purchaseorderstockininput';
import Purchaseorderstockininputnotperishable from './Purchaseorderstockininputnotperishable';
import Purchaseorderstockoutinventory from './Purchaseorderstockoutinventory';
import Purchaseorderstockoutinput from './Purchaseorderstockoutinput';
import Purchaseorderrelivery from './Purchaseorderredelivery';
import Purchaseorderrefund from './Purchaseorderrefund';
import Availableplants from './Availableplants';
import Availableplantswasted from './Availableplantswasted';
import Availableplantseditprice from './Availableplantseditprice';
import Otherexpenseslist from './Otherexpenseslist';
import Otherexpensesadd from './Otherexpensesadd';
import Otherexpensespaid from './Otherexpensespaid';
import Otherexpensespayment from './Otherexpensespayment';
import Allexpensespo from './Allexpensespo';
import Allexpensesoe from './Allexpensesoe';
import Redeliverylist from './Redeliverylist';
import Refundlist from './Refundlist';
import { BrowserRouter as Router, Route, Routes, Outlet } from 'react-router-dom';
import Crud from './Crud';
import Test from './Test';

const SidebarLayout = () => (
  <>
    <Nav />
    <Outlet />
  </>
);

function App() {
  return (
      <Router>
        <div className="App">
          <Routes>
            <Route element={<SidebarLayout/>}>
              <Route exact path="/home" element={<Home />} />
              <Route path='*' element={<Notfound />} />
              <Route exact path="/employeelist" element={<Employeelist />} />
              <Route exact path="/employeelistadd" element={<Employeelistadd />} />
              <Route path="/employeelistedit/:employeeid" element={<Employeelistedit  />} />
              <Route path="/employeelistpositionhistory/:employeeid" element={<Employeelistpositionhistory  />} />
              <Route path="/employeeidpicedit/:employeeid" element={<Employeeidpicedit />} />
              <Route path="/employeejobdescriptionedit/:employeeid" element={<Employeejobdescriptionedit />} />
              <Route path="/employeeprofile/:employeeid" element={<Employeeprofile />} />
              <Route exact path="/employeeaccounts" element={<Employeeaccounts />} />
              <Route path="/employeeaccountsedit/:employeeid" element={<Employeeaccountsedit />} />
              <Route exact path="/employeeaccountsadd" element={<Employeeaccountsadd />} />
              <Route exact path="/employeeaccountsinactive" element={<Employeeaccountsinactive />} />
              <Route exact path="/plantutilities" element={<Plantutilities />} />
              <Route exact path="/plantutilitiessoiltype" element={<Plantutilitiessoiltype />} />
              <Route exact path="/plantutilitiesplantprofile" element={<Plantutilitiesplantprofile />} />
              <Route exact path="/plantutilitiesplanttype" element={<Plantutilitiesplanttype />} />
              <Route exact path="/plantutilitiesotherexpense" element={<Plantutilitiesotherexpense />} />
              <Route exact path="/plantutilitiesunitsofmeasurement" element={<Plantutilitiesunitsofmeasurement/>} />
              <Route exact path="/plantutilitiespaymentmethod" element={<Plantutilitiespaymentmethod />} />
              <Route exact path="/plantutilitiesitemcategory" element={<Plantutilitiesitemcategory />} />
              <Route exact path="/farmprofiles" element={<Farmprofiles />} />
              <Route exact path="/farmprofilesadd" element={<Farmprofilesadd />} />
              <Route path="/farmprofilesedit/:farm_id" element={<Farmprofilesedit />} />
              <Route path="/farmprofilesowner/:owner_id" element={<Farmprofilesowner />} />
              <Route path="/farmprofilesowneradd/:farm_id" element={<Farmprofilesowneradd />} />
              <Route path="/farmprofilesview/:farm_id" element={<Farmprofilesview />} />
              <Route path="/farmprofilesimagemap/:farm_id" element={<Farmprofilesimagemap />} />
              <Route path="/farmprofilesgooglemap/:farm_id" element={<Farmprofilesgooglemap />} />
              <Route path="/farmprofilesorgchart/:farm_id" element={<Farmprofilesorgchart />} />
              <Route path="/farmprofilesareas/:farm_id" element={<Farmprofilesareas />} />
              <Route path="/farmprofilesareasadd/:farm_id" element={<Farmprofilesareasadd />} />
              <Route path="/farmprofilesareasedit/:area_id" element={<Farmprofilesareasedit />} />
              <Route exact path="/plantprofiles" element={<Plantprofiles />} />
              <Route exact path="/plantprofilesadd" element={<Plantprofilesadd />} />
              <Route path="/plantprofilesview/:plantprofileid" element={<Plantprofilesview />} />
              <Route path="/plantprofilesedit/:plantprofileid" element={<Plantprofilesedit />} />
              <Route path="/plantprofilespicedit/:plantprofileid" element={<Plantprofilespicedit />} />
              <Route path="/plantprofilesdiseaseadd/:plant_id" element={<Plantprofilesdiseaseadd />} />
              <Route path="/plantprofilesdiseaseedit/:disease_id" element={<Plantprofilesdiseaseedit />} />
              <Route exact path="/harvestcalendarlist" element={< Harvestcalendarlist />} />
              <Route exact path="/harvestcalendarlistinactive" element={< Harvestcalendarlistinactive />} />
              <Route exact path="/harvestcalendaradd" element={< Harvestcalendaradd />} />
              <Route path="/harvestcalendaredit/:batch_id" element={< Harvestcalendaredit />} />
              <Route path="/harvestcalendar/:batch_id" element={< Harvestcalendar />} />
              <Route path="/harvestcalendarmonitoring/:values" element={< Harvestcalendarmonitoring />} />
              <Route path="/harvestcalendarmonitoringevent/:values" element={< Harvestcalendarmonitoringevent />} />
              <Route path="/harvestcalendarinputmonitoring/:values" element={< Harvestcalendarinputmonitoring />} />
              <Route path="/harvestcalendarinputdiseases/:values" element={< Harvestcalendarinputdiseases />} />
              <Route path="/harvestcalendarupdatediseases/:values" element={< Harvestcalendarupdatediseases />} />
              <Route path="/harvestcalendardiseases/:values" element={< Harvestcalendardiseases />} />
              <Route path="/harvestcalendarinputmortalities/:values" element={< Harvestcalendarinputmortalities />} />
              <Route path="/harvestcalendarinputactivity/:values" element={< Harvestcalendarinputactivity />} />
              <Route path="/harvestinventoryinput/:batch_id" element={< Harvestinventoryinput />} />
              <Route path="/harvestinventoryinputvariations/:harvest_id" element={< Harvestinventoryinputvariations />} />
              <Route path="/harvestinventorymedia/:harvest_id" element={< Harvestinventorymedia />} />
              <Route path="/harvestinventoryviewvariations/:harvest_id" element={< Harvestinventoryviewvariations />} />
              <Route exact path="/harvestinventoryallvariations" element={< Harvestinventoryallvariations />} />
              <Route exact path="/harvestinventory" element={< Harvestinventory />} />
              <Route exact path="/harvestcalendarharvested" element={< Harvestcalendarharvested />} />
              <Route exact path="/harvestcalendaronsale" element={< Harvestcalendaronsale />} />
              <Route exact path="/harvestcalendarreadyforsale" element={< Harvestcalendarreadyforsale />} />
              <Route path="/harvestcalendarstockouts/:values" element={< Harvestcalendarstockouts />} />
              <Route exact path="/iteminventory" element={< Iteminventory />} />
              <Route exact path="/iteminventoryadd" element={< Iteminventoryadd />} />
              <Route path="/iteminventoryedit/:supply_id" element={< Iteminventoryedit />} />
              <Route path="/iteminventorystockouthistory/:supply_id" element={< Iteminventorystockouthistory />} />
              <Route path="/iteminventorystockinhistoryfull/:supply_id" element={< Iteminventorystockinhistoryfull />} />
              <Route path="/iteminventorystockinhistorypartial/:supply_id" element={< Iteminventorystockinhistorypartial />} />
              <Route exact path="/purchaseorders" element={< Purchaseorders />} />
              <Route exact path="/supplierslist" element={< Supplierslist />} />
              <Route exact path="/suppliersadd" element={< Suppliersadd />} />
              <Route path="/suppliersedit/:supplier_id" element={< Suppliersedit />} />
              <Route exact path="/purchaseorderlist" element={< Purchaseorderlist />} />
              <Route path="/purchaseorderadd/:supply_id" element={< Purchaseorderadd />} />
              <Route exact path="/purchaseorderlistinfo" element={< Purchaseorderlistinfo />} />
              <Route path="/purchaseorderedit/:po_id" element={< Purchaseorderedit />} />
              <Route path="/purchaseorderconfirmation/:supplier_id" element={< Purchaseorderconfirmation />} />
              <Route exact path="/purchaseorderconfirmedlist" element={< Purchaseorderconfirmedlist />} />
              <Route path="/purchaseorderconfirmedinfo/:final_po_id" element={< Purchaseorderconfirmedinfo />} />
              <Route path="/purchaseorderpayment/:final_po_id" element={< Purchaseorderpayment />} />
              <Route exact path="/purchaseorderhistory" element={< Purchaseorderhistory />} />
              <Route path="/purchaseorderstockin/:final_po_id" element={< Purchaseorderstockin />} />
              <Route path="/purchaseorderstockininput/:final_po_id/:po_id" element={< Purchaseorderstockininput />} />
              <Route path="/purchaseorderstockininputnotperishable/:final_po_id/:po_id" element={< Purchaseorderstockininputnotperishable />} />
              <Route path="/purchaseorderstockoutinventory/:values/:assign_id" element={< Purchaseorderstockoutinventory />} />
              <Route path="/purchaseorderstockoutinput/:values/:assign_id/:supply_id" element={< Purchaseorderstockoutinput />} />
              <Route path="/purchaseorderredelivery/:final_po_id/:po_id/:supply_id" element={< Purchaseorderrelivery />} />
              <Route path="/purchaseorderrefund/:final_po_id/:po_id/:supply_id" element={< Purchaseorderrefund />} />
              <Route exact path="/availableplants" element={< Availableplants />} />
              <Route exact path="/availableplantswasted" element={< Availableplantswasted />} />
              <Route path="/availableplantseditprice/:quantity_id" element={< Availableplantseditprice />} />
              <Route exact path="/otherexpenseslist" element={< Otherexpenseslist />} />
              <Route exact path="/otherexpensesadd" element={< Otherexpensesadd />} />
              <Route exact path="/otherexpensespaid" element={< Otherexpensespaid />} />
              <Route path="/otherexpensespayment/:other_expenses_id" element={< Otherexpensespayment />} />
              <Route exact path="/allexpensespo" element={< Allexpensespo />} />
              <Route exact path="/allexpensesoe" element={< Allexpensesoe />} />
              <Route exact path="/redeliverylist" element={< Redeliverylist />} />
              <Route exact path="/refundlist" element={< Refundlist />} />
              <Route exact path="/crud" element={< Crud />} />
              <Route exact path="/test" element={< Test />} />
            </Route>
            <Route exact path="/" element={<Login />} />
            <Route exact path="/login" element={<Login />} />
          </Routes>
        </div>
      </Router>
  );
}

export default App;
