-- Create policies for users table
CREATE POLICY "Users can view their own profile"
    ON users FOR SELECT
    USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
    ON users FOR UPDATE
    USING (auth.uid() = id);

-- Create policies for locations table
CREATE POLICY "Anyone can view locations"
    ON locations FOR SELECT
    USING (true);

CREATE POLICY "Only authenticated users can create locations"
    ON locations FOR INSERT
    WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Only location creators can update locations"
    ON locations FOR UPDATE
    USING (auth.uid() IN (
        SELECT created_by FROM courts WHERE courts.location_id = locations.id
    ));

-- Create policies for courts table
CREATE POLICY "Anyone can view courts"
    ON courts FOR SELECT
    USING (true);

CREATE POLICY "Only authenticated users can create courts"
    ON courts FOR INSERT
    WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Only court creators can update courts"
    ON courts FOR UPDATE
    USING (auth.uid() = created_by);

CREATE POLICY "Only court creators can delete courts"
    ON courts FOR DELETE
    USING (auth.uid() = created_by);

-- Create policies for court_images table
CREATE POLICY "Anyone can view court images"
    ON court_images FOR SELECT
    USING (true);

CREATE POLICY "Only court creators can add images"
    ON court_images FOR INSERT
    WITH CHECK (
        auth.uid() IN (
            SELECT created_by FROM courts WHERE courts.id = court_images.court_id
        )
    );

CREATE POLICY "Only court creators can delete images"
    ON court_images FOR DELETE
    USING (
        auth.uid() IN (
            SELECT created_by FROM courts WHERE courts.id = court_images.court_id
        )
    );

-- Create policies for comments table
CREATE POLICY "Anyone can view comments"
    ON comments FOR SELECT
    USING (true);

CREATE POLICY "Only authenticated users can create comments"
    ON comments FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Only comment authors can update comments"
    ON comments FOR UPDATE
    USING (auth.uid() = user_id);

CREATE POLICY "Only comment authors can delete comments"
    ON comments FOR DELETE
    USING (auth.uid() = user_id);

-- Create policies for favorites table
CREATE POLICY "Users can view their own favorites"
    ON favorites FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can add to their own favorites"
    ON favorites FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can remove from their own favorites"
    ON favorites FOR DELETE
    USING (auth.uid() = user_id);

-- Create policies for sightings table
CREATE POLICY "Anyone can view sightings"
    ON sightings FOR SELECT
    USING (true);

CREATE POLICY "Only authenticated users can create sightings"
    ON sightings FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Only sighting creators can update sightings"
    ON sightings FOR UPDATE
    USING (auth.uid() = user_id);

CREATE POLICY "Only sighting creators can delete sightings"
    ON sightings FOR DELETE
    USING (auth.uid() = user_id); 