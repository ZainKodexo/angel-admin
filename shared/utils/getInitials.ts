const getInitials = (name: string) => {
  return name[0] ? name[0].toUpperCase() : '';
};

export { getInitials };
