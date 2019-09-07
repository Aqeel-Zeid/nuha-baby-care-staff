import React from 'react'
import Cookie from 'universal-cookie'


export default function HRDashboard() {
    
   const cookie =  new Cookie()
   const USER_INFO = cookie.get('USER_STAFF') 



    return (
        <div>
            {
                USER_INFO.position.department.name === 'Human Resource Department' ? 
                    <> 
                        1234
                    </>
                : <> 
                    Access Denied 
                  </>    
            }        
        </div>
    )
}
