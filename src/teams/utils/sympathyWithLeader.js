

export const sympathyWithLeader = (members , {colleagues}) => {

  const sympathyWithLead = [];

  members.forEach(member => {
    const found = colleagues.find(c => member.user._id === c.user._id ? c : undefined );

    if (found !== undefined) {
        sympathyWithLead.push({  
            label: found.user.name + ' ' + found.user.surname,
            value: found.score
        });
    }else{
        sympathyWithLead.push({  
            label: member.user.name + ' ' + member.user.username,
            value: 0
        });
    }
  });

  return sympathyWithLead;       

  } 

